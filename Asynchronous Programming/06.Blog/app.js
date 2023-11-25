function attachEvents() {

    const postsUrl = 'http://localhost:3030/jsonstore/blog/posts';
    const commentsUrl = 'http://localhost:3030/jsonstore/blog/comments';

    const postsSelect = document.getElementById('posts');
    let data;

    const loadBtn = document
        .getElementById('btnLoadPosts')
        .addEventListener('click', async () => {

            try {
                const response = await fetch(postsUrl);
                data = await response.json();

                if (response.status !== 200) {
                    throw new Error(response.status);
                }
            } catch (error) {
                throw new Error(error);
            }

            function createOptions() {

                Object.values(data).forEach(post => {

                    const option = document.createElement('option');
                    option.setAttribute('id', post.id);
                    option.textContent = post.title;

                    postsSelect.appendChild(option);
                });
            }
            createOptions();
        });

    const viewBtn = document
        .getElementById('btnViewPost')
        .addEventListener('click', async () => {

            const postTitle = document.getElementById('post-title');
            postTitle.textContent = '';
            const postBody = document.getElementById('post-body');
            postBody.textContent = '';
            const postComments = document.getElementById('post-comments');
            postComments.textContent = '';

            const selectedPost = postsSelect.options[postsSelect.selectedIndex]; // get selected option
            const selectedPostId = selectedPost.id;
            let commentsData;

            try {
                const commentsRes = await fetch(commentsUrl);
                commentsData = await commentsRes.json();

                if (commentsRes.status !== 200) {
                    throw new Error();
                }
            } catch (error) {

                const title = document.getElementById('post-title');
                title.textContent = error;
                throw new Error(error);
            }

            const comments = Object.values(commentsData);
            const commentObjects = comments.filter((predicate) => predicate.postId === selectedPostId);
            const postId = commentObjects[0].postId;

            // POST
            postTitle.textContent = selectedPost.textContent;
            const postContent = data[postId].body;
            postBody.textContent = postContent;

            // COMMENTS

            commentObjects.forEach(comment => {

                const li = document.createElement('li');
                li.textContent = comment.text;
                postComments.appendChild(li);
            })


        });
}

attachEvents();