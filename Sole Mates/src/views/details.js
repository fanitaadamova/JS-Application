import { html } from "../../node_modules/lit-html/lit-html.js";
import { deleteShoes, getById } from "../data/shoes.js";
import { getUserData } from "../util.js";

//TODO replace with actual view
const detailsTemplate = (shoe, onDelete) => html `
<section id="details">
<div id="details-wrapper">
  <p id="details-title">Shoe Details</p>
  <div id="img-wrapper">
    <img src="${shoe.imageUrl}" alt="example1" />
  </div>
  <div id="info-wrapper">
    <p>Brand: <span id="details-brand">${shoe.brand}</span></p>
    <p>
      Model: <span id="details-model">${shoe.model}</span>
    </p>
    <p>Release date: <span id="details-release">${shoe.release}</span></p>
    <p>Designer: <span id="details-designer">${shoe.designer}</span></p>
    <p>Value: <span id="details-value">${shoe.value}</span></p>
  </div>
        

                   ${shoe.canEdit ? html`                
                   <!--Edit and Delete are only for creator-->
                   <div id="action-buttons">
                     <a href="/catalog/${shoe._id}/edit" id="edit-btn">Edit</a>
                     <a @click=${onDelete}href="javascript:void(0)" id="delete-btn">Delete</a>
                   </div>
        
                   ` : null}
         
</div>
</section>
`





export async function detailsPage(ctx) {
  const id = ctx.params.id;
  const shoe = await getById(id);

  const userData = getUserData();
  //shoe.canEdit - така създаваме променлива, която казва дали може да се edit-ва оферта, ако е owner-da и да се появи бутон по горе в HTML-a 
  if (userData && userData._id == shoe._ownerId) {
    shoe.canEdit = true;
  }
  ctx.render(detailsTemplate(shoe, onDelete));

  async function onDelete() {
    const choice = confirm('Are you sure?');

    if (choice) {
      await deleteShoes(id);
      ctx.page.redirect('/catalog');
    }
  }
}


