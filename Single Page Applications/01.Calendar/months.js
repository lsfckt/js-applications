
export function months() {
    const years = document.querySelector('#years');
    const attachEvent = document.querySelector("#years > table > tbody");
    attachEvent.addEventListener('click', toMonths);
    let clickedYear;
    let yearToShow;

    const DICT = {
        Jan: 1,
        Feb: 2,
        Mar: 3,
        Apr: 4,
        May: 5,
        Jun: 6,
        Jul: 7,
        Aug: 8,
        Sept: 9,
        Oct: 10,
        Nov: 11,
        Dec: 12,
    }

    function toMonths(e) {

        if (e.target.className === 'day' || e.target.className === 'date') {
            clickedYear = e.target.textContent.trim();
            yearToShow = document.querySelector(`#year-${clickedYear}`);

            years.style.display = 'none';
            yearToShow.style.display = 'block';

            const months = document.querySelector(`#year-${clickedYear} > table > tbody`);
            months.addEventListener('click', toMonths);

            function toMonths(e) {

                if (e.target.className === 'day' || e.target.className === 'date') {
                    const clickedMonth = e.target.textContent.trim();
                    console.log(DICT[clickedMonth]);
                    const monthToShow = document.querySelector(`#month-${clickedYear}-${DICT[clickedMonth]}`);

                    months.style.display = 'none';
                    yearToShow.style.display = 'none';
                    monthToShow.style.display = 'block';
                }
            }
        }
    }
}


