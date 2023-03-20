const commentsSection = document.getElementById('comment-section');
const comments = commentsSection.querySelector('.comment');
const commentsForm = commentsSection.querySelector('.answer-comment form');
const userDiv = commentsSection.querySelector('.comment .user-comment');
const postUrl = 'http://localhost:3030/jsonstore/collections/myboard/posts';
const commentsUrl = 'http://localhost:3030/jsonstore/collections/myboard/comments';
let userId = null;

commentsForm.addEventListener('submit', postComment);


function showComments() {
    clearCommentsForm();
    loadComments();
    document.querySelector('main').replaceChildren(commentsSection);
}

async function getPost(event) {
    comments.replaceChildren();
    userId = event.target.parentElement.dataset.id;

    if (!userId) {
        return;
    }
    const newUrl = `${postUrl}/${userId}`

    const targetPost = await fetch(newUrl).then(p => p.json());
    
    commentsSection.querySelector('.theme-name h2').textContent = targetPost.title;

    const div = document.createElement('div');
    div.className = 'header';

    div.innerHTML = `
            <img src="./static/profile.png" alt="avatar">
                    <p><span>${targetPost.username}</span> posted on <time>${targetPost.date}</time></p>

                     <p class="post-content">${targetPost.content}</p>`;

    comments.appendChild(div);

    showComments();
}

async function postComment(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const {
        content,
        username
    } = Object.fromEntries(formData.entries());

    if (content === '' || username === '') {
        return alert('All fields must be filled!');
    }

    try {
        const response = await fetch(commentsUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId,
                content,
                username,
                date: new Date()
            })
        });

        if (!response.ok) {
            throw await response.json();
        }

        clearCommentsForm();
        showComments();
    } catch (error) {
        alert(error.message);
    }
}

function clearCommentsForm() {
    commentsForm.reset();
}

async function loadComments() {
    userDiv.replaceChildren();
    const response = await fetch(commentsUrl);

    const commentsInfo = await response.json();
    
    

    for (const comment in commentsInfo) {
        if (userId === commentsInfo[comment].userId) {
            const commentDiv = document.createElement('div');
                 
            commentDiv.className = 'topic-name-wrapper';
           // console.log(commentsInfo[comment]);
            commentDiv.innerHTML = `
                <div class="topic-name">
                    <p><strong>${commentsInfo[comment].username}</strong> commented on <time>${commentsInfo[comment].date}</time></p>
                        <div class="post-content">
                            <p>${commentsInfo[comment].postText}</p>
                        </div>
                </div>`;

            userDiv.appendChild(commentDiv);
            comments.appendChild(userDiv);
        }
    }
}


export {
    getPost
}