import { html } from "../../node_modules/lit-html/lit-html.js";
import { deleteOffer, getById } from "../data/offers.js";
import { getUserData } from "../util.js";

//TODO replace with actual view
const detailsTemplate = (offer, onDelete) => html`
<section id="details">
<div id="details-wrapper">
  <img id="details-img" src="${offer.imageUrl}" alt="example1" />
  <p id="details-title">${offer.title}</p>
  <p id="details-category">
    Category: <span id="categories">${offer.category}</span>
  </p>
  <p id="details-salary">
    Salary: <span id="salary-number">${offer.salary}</span>
  </p>
  <div id="info-wrapper">
    <div id="details-description">
      <h4>Description</h4>
      <span>${offer.description}</span>
    </div>
    <div id="details-requirements">
      <h4>Requirements</h4>
      <span>${offer.requirements}</span>
    </div>
  </div>
  <!--<p>Applications: <strong id="applications">1</strong></p>-->

  <!--Edit and Delete are only for creator-->
  ${offer.canEdit ? html`
  <div id="action-buttons">
  <a href="/catalog/${offer._id}/edit" id="edit-btn">Edit</a>
  <a @click=${onDelete}href="javascript:void(0)" id="delete-btn">Delete</a>

  <!--Bonus - Only for logged-in users ( not authors )-->
  <!--<a href="" id="apply-btn">Apply</a>-->
</div>` : null}
 
</div>
</section>`;


export async function detailsPage(ctx) {
  const id = ctx.params.id;
  const offer = await getById(id);

  const userData = getUserData();
  //offer.canEdit - така създаваме променлива, която казва дали може да се edit-ва оферта, ако е owner-da и да се появи бутон по горе в HTML-a 
  if (userData && userData._id == offer._ownerId) {
    offer.canEdit = true;
  }
  ctx.render(detailsTemplate(offer, onDelete));

  async function onDelete() {
    const choice = confirm('Are you sure?');

    if (choice) {
      await deleteOffer(id);
      ctx.page.redirect('/catalog');
    }
  }
}