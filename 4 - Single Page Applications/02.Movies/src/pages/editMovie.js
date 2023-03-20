import { editMovie, getMovie } from "../api/data.js";
import { ctx } from "../api/router.js";
import { movieInfoPage } from "./movieInfo.js";

const section = document.getElementById('edit-movie');
const form = section.querySelector('form');


export async function editMoviePage(event){
    event.preventDefault()
    form.addEventListener('submit', onSubmit);
    const title = section.querySelector('#title');
    const description = section.querySelector('#description');
    const img = section.querySelector('#imageUrl');
    
    const id = event.target.id;
    const movie = await getMovie(id);
    title.value = movie.title;
    description.value = movie.description;
    img.value = movie.img;
    ctx.showSection(section);
    ctx.updateNav();

    async function onSubmit(e){
        movieInfoPage(event);
        e.preventDefault();
        const data = {
            title: title.value,
            description: description.value,
            img: img.value
        }
        
        await editMovie(id, data);
        
    }
}

