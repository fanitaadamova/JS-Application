import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllPets } from "../data/pets.js";

let ctx = null;
//TODO replace with actual view
const catalogTemplate = (pets) => html`
<section id="dashboard">
<h2 class="dashboard-title">Services for every animal</h2>
<div class="animals-dashboard">

${pets.length > 0 ? html`${pets.map(card)}` : html`<div><p class="no-pets">No pets in dashboard</p></div>`}
</div>
</section>`


const card = (onePet) => html`
<div class="animals-board">
<article class="service-img">
    <img class="animal-image-cover" src="${onePet.image}">
</article>
<h2 class="name">${onePet.name}</h2>
<h3 class="breed">${onePet.breed}</h3>
<div class="action">
    <a class="btn" href="/catalog/${onePet._id}">Details</a>
</div>
</div>`




export async function catalogPage(context) {
  ctx = context;
  const pets = await getAllPets();
  ctx.render(catalogTemplate(pets));
}

//////////////-------------------NEW--------------///////////////





    

    

   

   
    




