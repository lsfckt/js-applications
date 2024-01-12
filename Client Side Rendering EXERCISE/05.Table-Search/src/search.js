document.querySelector('#searchBtn').addEventListener('click', onClick);
const tbody = document.querySelector('tbody');
const input = document.getElementById('searchField');

export function onClick() {
    const searchItem = input.value;
    const students = tbody.children;
 
    Array.from(students).forEach(el => {
 
       el.classList.remove('select');
 
       if (el.textContent.toLowerCase().includes(searchItem.toLowerCase())) {
          el.classList.add('select');
       }
    });
 
    input.value = '';
 }