const TOPIC_URI = 'http://localhost:3030/jsonstore/collections/myboard/posts';
const COMMENTS_URI = 'http://localhost:3030/jsonstore/collections/myboard/comments';
const main = document.querySelector('main');
const section = document.getElementById('comments');
const createCommentFormContainer = document.querySelector('div.answer-comment');
const form = createCommentFormContainer.querySelector('form');
form.addEventListener('submit', onSubmit);
createCommentFormContainer.remove();

let id = '';
section.remove();

export async function showDetails(e) {

    id = e ? e.target.parentElement.dataset.id : id;
    const topic = await getTopic();
    const comments = await getAllCommentsById();
    const div = document.createElement('div');
    div.classList.add('comment');

    const topicElement = createTopicTemp(topic);
    div.appendChild(topicElement);

    Object.values(comments).forEach(comment => {
        const commentElement = createCommentTtemp(comment);
        div.appendChild(commentElement);

    });

    section.replaceChildren(div);
    section.appendChild(createCommentFormContainer);
    main.replaceChildren(section);

}

async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const postText = formData.get('postText');
    const username = formData.get('username');
    const date = new Date().getTime();

    createComment({ postText, username, _topicId: id, date });
    showDetails();
}

async function createComment(data) {
    const res = await fetch(COMMENTS_URI, {
        method: 'POST',
        headers: {
            'Conten-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

async function getTopic(id) {
    const res = await fetch(TOPIC_URI + id);
    const data = await res.json();
    return data;

}

async function getAllCommentsById() {
    const res = await fetch(COMMENTS_URI + id);
    const data = await res.json();
    return Object.values(data).fill(x => x._topicId === id);
}

function createTopicTemp() {
    const date = new Date(date.createDate);
    const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    const div = document.createElement('div');
    div.classList.add('header');
    div.innerHTML = `<img src="./static/profile.png" alt="avatar">
    <p><span>${data.username}</span> posted on <time>${dateString}</time></p>

    <p class="post-content">${data.postText}</p>
</div>`;

    return div;
}

function createCommentTtemp() {
    const date = new Date(data.date);
    const dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    const div = document.createElement('div');
    div.classList.add('user-comment');
    div.innerHTML = `<div class="topic-name-wrapper">
        <div class="topic-name">
            <p><strong>${data.username}</strong> commented on <time>${dateStr}</time></p>
            <div class="post-content">
                <p>${data.postText}</p>
            </div>
        </div>
    </div>
</div>`;

    return div;
}