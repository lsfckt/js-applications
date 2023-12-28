import { displayView, elementFactory } from './util.js';
import { homeView } from './home.js';
import { editView } from './edit.js';

const section = document.querySelector('#movie-example');

export function detailsView(id) {
    displayView(section);

    displayMovie(id)
}

export async function displayMovie(id) {

    const user = JSON.parse(localStorage.getItem('user'));
    const [movie, likes, ownLike] = await Promise.all([
        getMovie(id),
        getLikes(id),
        hasLiked(id, user),
    ]);

    section.replaceChildren(onCreateMovie(movie, user, likes, ownLike));
}

function onCreateMovie(movie, user, likes, ownLikes) {

    console.log(movie);

    const element = document.createElement('div');
    element.className = 'container';

    element.innerHTML = `
    <div class="row bg-light text-dark">
  
  <h1>Movie title: ${movie.title}</h1>
    <div class="col-md-8">
      <img class="img-thumbnail" src="${movie.img}" alt="Movie">
    </div>
    <div class="col-md-4 text-center">
        <h3 class="my-3 ">Movie Description</h3>
        <p>
        ${movie.description}
        </p>
      ${onControls(movie, user, likes, ownLikes)}
    </div>
  </div> 
  `

    const deleteBtn = element.querySelector('a[data-id="delete-button"]');
    const editBtn = element.querySelector('a[data-id="edit-button"]');
    const likeBtn = element.querySelector('a[data-id="like-function"]');

    if (deleteBtn) {
        deleteBtn.addEventListener('click', (e) => deleteMovie(e, movie._id));
        editBtn.addEventListener('click', (e) => editMovie(e, movie._id));
    } else if (likeBtn) {
        likeBtn.addEventListener('click', (e) => likeMovie(e, movie._id));
    }

    return element;
}

function onControls(movie, user, likes, ownLikes) {
    const likesArr = [];
    const token = localStorage.getItem('accessToken');
    const isOwner = user && user._id == movie.ownerId;

    if (token && isOwner) {
        if (ownLikes) {

            likesArr.push(`<span style="display: inline-block;" data-id="likes-count" class="enrolled-span">Liked ${likes}</span>`);
            likesArr.push(`<a style="display: none;" data-id="like-function" class="btn btn-primary" href="#">Like</a>`);
        } else {
            likesArr.push(`<span style="display: inline-block;" data-id="likes-count" class="enrolled-span">Liked ${likes}</span>`);
            likesArr.push(`<a style="display: inline-block;" data-id="like-function" class="btn btn-primary" href="#">Like</a>`);
        }
    } else {
        likesArr.push(`<span style="display: inline-block;" data-id="likes-count" class="enrolled-span">Liked ${likes}</span>`);
    }

    return likesArr.join('');
}

async function likeMovie(e, movieId) {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));

    try {
        await fetch('http://localhost:3030/data/likes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': user.accessToken,
            },
            body: JSON.stringify({
                movieId,
            }),
        });
        detailsView(movieId);
    } catch (err) {
        alert(err.message);
    }
}

async function deleteMovie(e, movieId) {
    e.preventDefault();

    try {
        let userDataInfo = JSON.parse(localStorage.getItem('user')) || null;
        let token = userDataInfo ? userDataInfo.accessToken : null;
        const id = movieId;

        if (token == null) {
            throw new Error('no permission');
        }

        const res = await fetch(`http://localhost:3030/data/movies/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application.json',
                'X-Authorization': token,
            },
        });

        const data = await res.json();

        if (res.ok == false) {
            const error = await res.json();
            throw new Error(error);
        } else {
            alert('Movie deleted');
            displayMovie();
            homeView();
            return data;
        }
    } catch (err) {
        alert(err);
    }
}

async function editMovie(e, movieId) {
    e.preventDefault();

    editView(movieId);
}

async function getMovie(id) {
    const res = await fetch(`http://localhost:3030/data/movies/${id}`);
    const movie = await res.json();

    return movie;
}

async function getLikes(id) {
    const res = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`);
    const likes = await res.json();

    return likes;
}

async function hasLiked(movieId, user) {
    if(!user) {
        return false;
    } else {
        const userId = user._id;

        const res = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`);
        const like = await res.json();

        return like.length > 0;
    }
}