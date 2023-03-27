import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllAbums } from "../data/albums.js";
let ctx = null;
//TODO replace with actual view
const catalogTemplate = (albums) => html `
<section id="dashboard">
<h2>Albums</h2>
${albums.length > 0 ? html `<ul class="card-wrapper">${albums.map(albumCard)}</ul>` : html `<h2>There are no albums added yet.</h2>`}
</section>`;

const albumCard = (albumCurrent) => html `
  <li class="card">
    <img src="${albumCurrent.imageUrl}" alt="travis" />
    <p>
      <strong>Singer/Band: </strong><span class="singer">${albumCurrent.singer}</span>
    </p>
    <p>
      <strong>Album name: </strong><span class="album">${albumCurrent.album}</span>
    </p>
    <p><strong>Sales:</strong><span class="sales">${albumCurrent.sales}</span></p>
    <a class="details-btn" href="/catalog/${albumCurrent._id}">Details</a>
  </li>`


export async function catalogPage(context) {
  ctx = context;
    const albums = await getAllAbums();
    ctx.render(catalogTemplate(albums));
}






