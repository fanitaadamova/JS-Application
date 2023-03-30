import { html } from "../../node_modules/lit-html/lit-html.js";
import { deleteMeme, getById } from "../data/memes.js";
import { getUserData } from "../util.js";

//TODO replace with actual view
const detailsTemplate = (meme, onDelete) => html `
<section id="meme-details">
<h1>Meme Title: ${meme.title}

</h1>
<div class="meme-details">
    <div class="meme-img">
        <img alt="meme-alt" src="${meme.imageUrl}">
    </div>
    <div class="meme-description">
        <h2>Meme Description</h2>
        <p>${meme.description}</p>

        <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
        ${meme.canEdit ? html`                
        <a class="button warning" href="/catalog/${meme._id}/edit">Edit</a>
        <button @click=${onDelete}href="javascript:void(0) class="button danger">Delete</button>` : null}

        
    </div>
</div>
</section>`




export async function detailsPage(ctx) {
  const id = ctx.params.id;
  const meme = await getById(id);

  const userData = getUserData();
  //meme.canEdit - така създаваме променлива, която казва дали може да се edit-ва оферта, ако е owner-da и да се появи бутон по горе в HTML-a 
  if (userData && userData._id == meme._ownerId) {
    meme.canEdit = true;
  }
  ctx.render(detailsTemplate(meme, onDelete));

  async function onDelete() {
    const choice = confirm('Are you sure?');

    if (choice) {
      await deleteMeme(id);
      ctx.page.redirect('/catalog');
    }
  }
}


