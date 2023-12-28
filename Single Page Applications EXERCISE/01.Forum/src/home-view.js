import { showDetails } from "./detail-view.js";
const URI = 'http://localhost:3030/jsonstore/collections/myboard/posts';

const main = document.querySelector('main');
const topicContent = document.querySelector('div.topic-title');
const section = document.querySelector('div.new-topic-border');
const form = document.querySelector('form');
const cancel = document.querySelector('.cancel');

cancel.addEventListener('click', clearForm);
form.addEventListener('submit', onSubmit);
section.remove();

export async function showHome(e) {
    e?.preventDefault();
    topicContent.innerHTML = '';

    const topics = await getAllTopics();
    Object.values(topics).forEach(topic => {
        const temp = createTopicTemp(topic);
        topicContent.appendChild(temp);
    })



    topicContent.querySelector('a').addEventListener('click', showDetails);

    main.replaceChildren(section);
    main.appendChild(topicContent);
}

function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const topicName = formData.get('topicName');
    const username = formData.get('username');
    const postText = formData.get('postText');
    const createDate = new Date().getTime();

    createTopic({ topicName, username, postText, createDate });
}

async function getAllTopics() {
    const res = await fetch(URI);

    const data = await res.json();
    return data;
}

async function createTopic(data) {
    const res = await fetch(URI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    clearForm();
    showHome();

}

function clearForm(e) {
    e?.preventDefault();

    form.reset();
}

function createTopicTemp(topic) {

    const div = document.createElement('div');
    div.classList.add('topic-container');

    div.innerHTML = `<div class="topic-container">
    <div class="topic-name-wrapper">
        <div class="topic-name">
            <a href="#" class="normal" data-id=${topic._id}>
                <h2>${topic.topicName}</h2>
            </a>
            <div class="columns">
                <div>
                    <p>Date: <time>${new Date(topic.createDate).toISOString()}</time></p>
                    <div class="nick-name">
                        <p>Username: <span>${topic.username}</span></p>
                    </div>
                </div>
    
    
            </div>
        </div>
    </div>
    </div>`;

    return div;
}
