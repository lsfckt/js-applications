import { months } from './months.js';

const sections = document.querySelectorAll('section');

export function years() {
    sections.forEach(el => {

        if (el.className === 'yearsCalendar') {
            el.style.display = 'block';
        } else {
            el.style.display = 'none';
        }
    });
};

years();
months();