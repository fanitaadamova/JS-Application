import { getPost } from "./comments.js";

const section = document.getElementById('topic-section');
const form = section.querySelector('form');

const url = 'http://localhost:3030/jsonstore/collections/myboard/posts';
form.reset();

section.querySelector('.cancel').addEventListener('click', clearPost);
form.addEventListener('submit', postTopic);
section.addEventListener('click', getPost);

getTopics();

function showPost() {
    document.querySelector('main').replaceChildren(section);
}


async function postTopic(event) {
    event.preventDefault();



    const formInput = new FormData(event.target);
    const formData = Object.fromEntries(formInput.entries());

    const title = formData.topicName;
    const username = formData.username;
    const content = formData.postText;
   
    
    if (title == '' || username == "" || content === '') {
        return alert('All fields must be filled');
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                username,
                content,
                date: new Date()
            })
        });

        if (!response.ok) {
            throw await response.json();
        };

        clearPost();
        getTopics();
    } catch (error) {
        alert(error.message);
    }
}

function clearPost() {
    form.reset();
}

async function getTopics() {
    const topics = section.querySelector('.topic-title');
    topics.replaceChildren();
   
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw response.json();
        }

        const data = await response.json();
        
        for (const element in data) {

            const div = document.createElement('div');
            div.className = 'topic-container';
            div.innerHTML = `
            <div class="topic-name-wrapper">
                <div class="topic-name">
                    <a href="#" class="normal" data-id='${data[element]._id}'>
                        <h2>${data[element].title}</h2>
                    </a>
                <div class="columns">
                    <div>
                        <p>Date: <time>${data[element].date}</time></p>
                        <div class="nick-name">
                            <p>Username: <span>${data[element].username}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
            
            topics.appendChild(div);
        }
    } catch (error) {
        alert(error.message);
    }
}



export {
    showPost
}