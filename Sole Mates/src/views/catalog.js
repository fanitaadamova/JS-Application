import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllShoes } from "../data/shoes.js";
let ctx = null;
//TODO replace with actual view
const catalogTemplate = (shoes) => html`
<section id="dashboard">
<h2>Collectibles</h2>

${shoes.length > 0 ? html`<ul class="card-wrapper">${shoes.map(card)}</ul>` : html`<h2>There are no items added yet.</h2>`}
</section>`;

const card = (oneShoe) => html`
<li class="card">
<img src="${oneShoe.imageUrl}" alt="travis" />
<p>
  <strong>Brand: </strong><span class="brand">${oneShoe.brand}</span>
</p>
<p>
  <strong>Model: </strong
  ><span class="model">${oneShoe.model}</span>
</p>
<p><strong>Value:</strong><span class="value">${oneShoe.value}</span>$</p>
<a class="details-btn" href="/catalog/${oneShoe._id}">Details</a>
</li>`





export async function catalogPage(context) {
  ctx = context;
  const shoes = await getAllShoes();
  ctx.render(catalogTemplate(shoes));
}






