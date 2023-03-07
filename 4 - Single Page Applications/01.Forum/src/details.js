const section = document.getElementById('detailsView');
const postElement = {
    title: document.getElementById('details-title'),
    username: document.getElementById('details-username'),
    time: document.getElementById('details-time'),
    content: document.getElementById('details-content')
}
const commentList = document.getElementById('user-comment');

const form = section.querySelector('form');
form.addEventListener("submit", onSubmit);

section.remove();

export function showDitails(ev) {
    let target = ev.target;
    if (target.tagName == "H2") {
        target = target.parentElement;
    }
    if (target.tagName == "A") {
        ev.preventDefault();
        const postId = target.id;
        showPost(postId);
    }

}


async function showPost(postId) {
    document.getElementById('main').replaceChildren('Loading........');

    const [res, commentsRes] = await Promise.all([
        fetch('http://localhost:3030/jsonstore/collections/myboard/posts/' + postId),
        fetch('http://localhost:3030/jsonstore/collections/myboard/comments')
    ]);
    const [post, comments] = await Promise.all([
        res.json(),
        commentsRes.json()

    ]);

    commentList.replaceChildren(...Object
        .values(comments)
        .filter(c => c.postId == postId)
        .map(createCommentElement));

    form.id = postId;
    postElement.title.textContent = post.title;
    postElement.username.textContent = post.username;
    postElement.time.textContent = post.dateCreated;
    postElement.content.textContent = post.content;


    document.getElementById('main').replaceChildren(section);
    console.log(postId);

}

function createCommentElement(comment) {
    const element = document.createElement('div');
    element.className = "topic-name-wrapper";
    element.innerHTML = `
    <div class="topic-name">
    <p><strong>${comment.username}</strong> commented on <time>${comment.dateCreated}</time></p>
    <div class="post-content">
        <p>${comment.content}</p>
    </div>
</div>`;

    return element;

}

async function onSubmit(ev) {
    ev.preventDefault();
    const formData = new FormData(form);
    //console.log(...formData.entries());
    const username = formData.get('username').trim();
    const content = formData.get('postText').trim();
    const postId = form.id;

    try {
        if (username == "" || content == "") {
            throw new Error("The fields must be not empty!");
        }

        const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                content,
                postId,
                dateCreated: new Date()
            })
        });
        if (response.ok != true) {
            const error = await response.json();
            throw new Error(error.message);
        }
        form.reset();

        showPost(postId);
    } catch (error) {
        alert(error.message)
    }

}

