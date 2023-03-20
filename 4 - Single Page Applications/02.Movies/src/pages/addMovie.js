import { addMovie } from "../api/data.js";

const section = document.getElementById('add-movie');
const form = document.getElementById('add-movie-form');

export function addMoviePage(context) {
    context.showSection(section);
    context.updateNav();
    form.addEventListener('submit', onSubmit);


    async function onSubmit(e) {
        e.preventDefault();

        try {
            
        

        const formData = new FormData(form);
        const userData = localStorage.getItem('userData');

        const title = formData.get('title');
        const description = formData.get('description');
        const img = formData.get('img');

        if (!title || !description || !img) {
            throw alert('All fields are required!');
        }

        const data = {
            title,
            description,
            img,
            _ownerId: userData._id
        }
        
        await addMovie(data);
        
        context.goTo('/');
        form.reset();

    } catch (error) {
            throw error.message
    }
    }

}