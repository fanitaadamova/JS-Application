import {html, render} from '../../node_modules/lit-html/lit-html.js';
import { getAllMovies } from '../api/data.js';
import { movieInfoPage } from './movieInfo.js';

const section = document.getElementById('home-page');

const template = (movies) => html `

    ${movies.map(movie => html`
    <li class="card mb-4">
        <img class="card-img-top" src="${movie.img}" alt="Card image cap" width="400">
        <div class="card-body">
            <h4 class="card-title">${movie.title}</h4>
        </div>
        <div class="card-footer">
            <a href="/movieInfo">
                <button type="button" id = ${movie._id} @click = ${movieInfoPage} class="btn btn-info">Details</button>
            </a>
        </div>
</li>
    `)}
`;

export async function homePage(context){
    
    context.showSection(section);
    context.updateNav();
    section.querySelector('#add-movie-button').addEventListener('click', ()=>{
        context.goTo('/add')
    })
    
    const movieSection = document.querySelector('#movies-list');
   

    const movies = await getAllMovies();

    if(movies.length == 0){
        return
    }
    render(template(movies), movieSection)
}
