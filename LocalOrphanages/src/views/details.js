import { html } from "../../node_modules/lit-html/lit-html.js";
import { deletePost, getById } from "../data/posts.js";
import { donate, getApplications, getUserApplication } from "../data/applications.js";
import { getUserData } from "../util.js";

//TODO replace with actual view
const detailsTemplate = (post, onDelete, onDonate) => html `
<section id="details-page">
<h1 class="title">Post Details</h1>

<div id="container">
    <div id="details">
        <div class="image-wrapper">
            <img src="${post.imageUrl}" alt="Material Image" class="post-image">
        </div>
        <div class="info">
            <h2 class="title post-title">${post.title}</h2>
            <p class="post-description">Description: ${post.description}</p>
            <p class="post-address">Address: ${post.address}</p>
            <p class="post-number">Phone number: ${post.phone}</p>
            <p class="donate-Item">Donate Materials: ${ post.applications}</p>

            <!--Edit and Delete are only for creator-->




            ${post.canEdit || post.canDonate ? html`
            <div class="btns">
                  ${post.canEdit ? html`
                  <a href="/catalog/${post._id}/edit" class="edit-btn btn">Edit</a>
                  <a @click=${onDelete}href="javascript:void(0) class="delete-btn btn">Delete</a>` : null}

                  ${post.canDonate ? html`<a @click=${onDonate}href="javascript:void(0)" class="donate-btn btn">Donate</a>` : null}
          
             </div>` : null}


        </div>
    </div>
</div>
</section>`;






export async function detailsPage(ctx) {
  const id = ctx.params.id;
  //Правим Promise all
  const requests = [
    getById(id),
    getApplications(id)
  ]

  const userData = getUserData();

  if (userData) {
    requests.push(getUserApplication(id, userData._id));
  }

  const [post, applications, hasDonated] = await Promise.all(requests)
  post.applications = applications;
  if (userData) {
    //връща true or false- може или не моде да едитва
    post.canEdit = userData._id == post._ownerId;
    post.canDonate = hasDonated == 0;

  }



  ctx.render(detailsTemplate(post, onDelete, onDonate));

  async function onDelete() {
    const choice = confirm('Are you sure?');

    if (choice) {
      await deletePost(id);
      ctx.page.redirect('/');
    }
  }

  async function onDonate() {
       await donate(id);
       ctx.page.redirect('/catalog/' + id);
  }


}
