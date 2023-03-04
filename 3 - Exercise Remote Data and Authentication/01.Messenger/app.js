function attachEvents() {
    document.getElementById('submit').addEventListener('click', addComment);
    document.getElementById('refresh').addEventListener('click', displayAllComments);
}

const messangerUrl = 'http://localhost:3030/jsonstore/messenger';

function addComment() {
    const nameAuthor = document.querySelector('[name="author"]');
    const contentAuthor = document.querySelector('[name="content"]');
    if (!nameAuthor.value || !contentAuthor.value) return;
    fetch(messangerUrl, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            author: nameAuthor.value.trim(),
            content: contentAuthor.value.trim()
        })
    }).then(res => {
        if (!res.ok) throw new Error('Error');
        return res.json()
    }).catch(e => alert(e.message))
}


function displayAllComments() {
    fetch(messangerUrl)
        .then(res => {
            if (!res.ok) throw new Error('Error');
            return res.json()
        }).then(data => {
            const textArea = document.querySelector('#messages');
            const allComments = [];
            Object.values(data).forEach(element => allComments.push(`${element.author}: ${element.content}`));
            textArea.value = allComments.join('\n');
        }).catch(e => alert(e.message))
}

attachEvents();