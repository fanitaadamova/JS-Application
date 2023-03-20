import {html, render} from '../../node_modules/lit-html/lit-html.js';
import { deleteMovie, getLikes, getMovie, getUserLike, likeMovie } from '../api/data.js';
import { ctx } from '../api/router.js';
import { editMoviePage } from './editMovie.js';


const section = document.querySelector('#movie-example');
section.innerHTML = '';


const template = (movie, likes, userLike, userData) => html `
        <div class="container">
          <div class="row bg-light text-dark">
            <h1>Movie title: ${movie.title}</h1>

            <div class="col-md-8">
              <img
                class="img-thumbnail"
                src="${movie.img}"
                alt="Movie"
              />
            </div>
            <div class="col-md-4 text-center">
              <h3 class="my-3">Movie Description</h3>
              <p>
                ${movie.description}
              </p>
              ${!userData ? null : html `${movie._ownerId == userData._id ? html `<a id=${movie._id} class="btn btn-danger" @click = ${del} href="/delMovie">Delete</a>` : null}
              ${movie._ownerId == userData._id ? html `<a id=${movie._id} class="btn btn-warning" @click = ${editMoviePage} href="/editMovie">Edit</a>` : null}
              ${(movie._ownerId != userData._id ) ? html `<a id=${movie._id} class="btn btn-primary" @click = ${like} href="/likeMovie">Like</a>` : null}
              ${likes > 0 ? html `<span class="enrolled-span">Liked ${likes}</span>` : null}`}
            </div>
          </div>
        </div>
`;


export async function movieInfoPage(event){
  event.preventDefault();
  const userData = JSON.parse(localStorage.getItem('userData'));
  const id = event.target.id;
  const movie = await getMovie(id);
  const likes = await getLikes(id);
  ctx.showSection(section);
  ctx.updateNav();
  if(userData){
    const userLike = await getUserLike(id, userData._id);
    render(template(movie, likes, userLike, userData), section);
  }else{
    render(template(movie, likes, userData), section);
  }  
  
}

async function like(e){
  movieInfoPage(e);
  e.preventDefault();
  const id = e.target.id;
  const data = {
    movieId: id
  }
  await likeMovie(data)
}

async function del(e){
  e.preventDefault();
  const id = e.target.id;
  const confirmation = confirm('Are you sure?');
   if(confirmation){
    await deleteMovie(id)
    ctx.goTo('/');
   }
}