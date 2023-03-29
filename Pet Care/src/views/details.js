import { html } from "../../node_modules/lit-html/lit-html.js";
import { deletePet, getById } from "../data/pets.js";
import { donate, getApplications, getUserApplication } from "../data/applications.js";
import { getUserData } from "../util.js";

//TODO replace with actual view
const detailsTemplate = (pet, onDelete, onDonate, counter) => html `
<section id="detailsPage">
<div class="details">
    <div class="animalPic">
        <img src="${pet.image}">
    </div>
    <div>
        <div class="animalInfo">
            <h1>Name: ${pet.name}</h1>
            <h3>Breed: ${pet.breed}</h3>
            <h4>Age: ${pet.age}</h4>
            <h4>Weight: ${pet.weight}</h4>
            <h4 class="donation">Donation: ${Number(counter) * 100}$</h4>
        </div>
        <!-- if there is no registered user, do not display div-->

                   ${pet.canEdit || pet.canDonate ? html`
                   <div class="actionBtn">
                         ${pet.canEdit ? html`
                         <a href="/catalog/${pet._id}/edit" class="edit">Edit</a>
                        <a @click=${onDelete}href="javascript:void(0)" class="remove">Delete</a>` : null}
                         ${pet.canDonate ? html`<a @click=${onDonate}href="javascript:void(0)" class="donate">Donate</a>` : null}
                    </div>` : null}

    </div>
</div>
</section>`





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

 
  let counter = 0
  const [pet, applications, hasDonated] = await Promise.all(requests)
  pet.applications = applications;
  if (userData) {
    //връща true or false- може или не моде да едитва
    pet.canEdit = userData._id == pet._ownerId;
    pet.canDonate = pet.canEdit == false && hasDonated == 0;
     if(hasDonated != 0){
      counter += 1;
     }
  }



  ctx.render(detailsTemplate(pet, onDelete, onDonate, counter));

  async function onDelete() {
    const choice = confirm('Are you sure?');

    if (choice) {
      await deletePet(id);
      ctx.page.redirect('/');
    }
  }

  async function onDonate() {
       await donate(id);
       ctx.page.redirect('/catalog/' + id);
  }


}

