function solve() {
    // write get functionality and other tasks
    
    const baseUrl = 'http://localhost:3030/jsonstore/collections/books';
    const form = document.querySelector('form');
    form.addEventListener('submit', createBook);

    async function createBook(e) {
        e.preventDefault();
        try {
            const formData = new FormData(form);
            const title = formData.get('title');
            const author = formData.get('author');

            if(!title || !author) {
                throw new Error('Empty form, please write author and title');
            }

            const createRes = await fetch(baseUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    author,
                    title,
                }),
            });

            const resData = await createRes.json();

            if(!createRes.ok) {
                throw new Error(createRes.status);
            }
        } catch (error) {
            alert(error);
        };
    };
};
solve();