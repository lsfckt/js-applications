function attachEvents() {
    document.getElementById('submit').addEventListener('click', send);
    document.getElementById('refresh').addEventListener('click', refresh);
}
attachEvents();

const url = 'http://localhost:3030/jsonstore/messenger';

async function send() {

    const authorName = document.getElementsByName('author')[0].value;
    const msgText = document.getElementsByName('content')[0].value;

   const options = {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
        author: authorName,
        content: msgText,
    }),
   };

   const response = await fetch(url, options);
   const data = await response.json();

   return data;
}

async function refresh() {
    const textArea = document.getElementById('messages');

    const response = await fetch(url, { method: 'GET' });
    const data = await response.json();
    
    const values = Object.values(data);
    let output = '';

    values.forEach(line => {
        output += `${line.author}: ${line.content}\n`;
    });

    textArea.value = output.trimEnd();
}