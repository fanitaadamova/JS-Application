import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllMemes } from "../data/memes.js";
let ctx = null;
//TODO replace with actual view
const catalogTemplate = (memes) => html`
<section id="meme-feed">
<h1>All Memes</h1>


${memes.length > 0 ? html`<div id="memes">${memes.map(card)}</div>` : html`<p class="no-memes">No memes in database.</p>`}

</section>`;

const card = (oneMeme) => html`
<div class="meme">
<div class="card">
    <div class="info">
        <p class="meme-title">${oneMeme.title}</p>
        <img class="meme-image" alt="meme-img" src="${oneMeme.imageUrl}">
    </div>
    <div id="data-buttons">
        <a class="button" href="/catalog/${oneMeme._id}">Details</a>
    </div>
</div>
</div>`





export async function catalogPage(context) {
  ctx = context;
  const memes = await getAllMemes();
  ctx.render(catalogTemplate(memes));
}

