import { html } from "../../node_modules/lit-html/lit-html.js";
import { deleteAlbum, getById } from "../data/albums.js";
import { getUserData } from "../util.js";

//TODO replace with actual view
const detailsTemplate = (album, onDelete) => html `
<section id="details">
<div id="details-wrapper">
  <p id="details-title">Album Details</p>
  <div id="img-wrapper">
    <img src="${album.imageUrl}" alt="${album.imageUrl}" />
  </div>
  <div id="info-wrapper">
    <p><strong>Band:</strong><span id="details-singer">${album.singer}</span></p>
    <p>
      <strong>Album name:</strong><span id="details-album">${album.album}</span>
    </p>
    <p><strong>Release date:</strong><span id="details-release">${album.release}</span></p>
    <p><strong>Label:</strong><span id="details-label">${album.label}</span></p>
    <p><strong>Sales:</strong><span id="details-sales">${album.sales}</span></p>
  </div>
  <div id="likes">Likes: <span id="likes-count">0</span></div>
          <div id="action-buttons">
                   ${album.canEdit ? html`                
                   <a href="/catalog/${album._id}/edit" id="edit-btn">Edit</a>
                   <a @click=${onDelete}href="javascript:void(0)" id="delete-btn">Delete</a>
                   ` : null}
           </div>
</div>
</section>
`


export async function detailsPage(ctx) {
  const id = ctx.params.id;
  const album = await getById(id);

  const userData = getUserData();
  //album.canEdit - така създаваме променлива, която казва дали може да се edit-ва оферта, ако е owner-da и да се появи бутон по горе в HTML-a 
  if (userData && userData._id == album._ownerId) {
    album.canEdit = true;
  }
  ctx.render(detailsTemplate(album, onDelete));

  async function onDelete() {
    const choice = confirm('Are you sure?');

    if (choice) {
      await deleteAlbum(id);
      ctx.page.redirect('/catalog');
    }
  }
}


