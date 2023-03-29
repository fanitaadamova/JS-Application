import { html } from "../../node_modules/lit-html/lit-html.js";
import { getById, updatePet } from "../data/pets.js";
import { createSubmitHandler } from "../util.js";

//слагаме .value=${album.imageUrl} и.т.н
//@submit=${onEdit}
const editTemplate = (pet, onEdit) => html`
<section id="editPage">
<form @submit=${onEdit} class="editForm">
    <img src="/images/editpage-dog.jpg">
    <div>
        <h2>Edit PetPal</h2>
        <div class="name">
            <label for="name">Name:</label>
            <input name="name" id="name" type="text" .value=${pet.name}>
        </div>
        <div class="breed">
            <label for="breed">Breed:</label>
            <input name="breed" id="breed" type="text" .value=${pet.breed}>
        </div>
        <div class="Age">
            <label for="age">Age:</label>
            <input name="age" id="age" type="text" .value=${pet.age}>
        </div>
        <div class="weight">
            <label for="weight">Weight:</label>
            <input name="weight" id="weight" type="text" .value=${pet.weight}>
        </div>
        <div class="image">
            <label for="image">Image:</label>
            <input name="image" id="image" type="text" .value=${pet.image}>
        </div>
        <button class="btn" type="submit">Edit Pet</button>
    </div>
</form>
</section>`;


//@submit=${onEdit}


export async function editPage(ctx) {
  const id = ctx.params.id;
  const pet = await getById(id);

  ctx.render(editTemplate(pet, createSubmitHandler(onEdit)));

  //създаваме функция, която подаваме като параметър на темплейта и закачаме eventListener
  //деструктурираме дейтата, за да извадим своествата, които ни трябват и които ще изпратим в заявката след Edit

  async function onEdit({
    name,
    breed,
    age,
    weight,
    image

  }) {

    if (name === '' || breed === '' || age === '' || weight === '' || image === '') {
      return alert('All fields are requared!')
    }

    await updatePet(id, {
      name,
      breed,
      age,
      weight,
      image
    })

    ctx.page.redirect('/catalog/' + id);

  }


}