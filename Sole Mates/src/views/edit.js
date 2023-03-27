import { html } from "../../node_modules/lit-html/lit-html.js";
import { getById, updateShoes } from "../data/shoes.js";
import { createSubmitHandler } from "../util.js";

//слагаме .value=${album.imageUrl} и.т.н
const editTemplate = (shoe, onEdit) => html`
<section id="edit">
<div class="form">
  <h2>Edit item</h2>
  <form @submit=${onEdit} class="edit-form">
    <input
      type="text"
      name="brand"
      id="shoe-brand"
      placeholder="Brand"  .value=${shoe.brand} 
    />
    <input
      type="text"
      name="model"
      id="shoe-model"
      placeholder="Model"  .value=${shoe.model} 
    />
    <input
      type="text"
      name="imageUrl"
      id="shoe-img"
      placeholder="Image url"  .value=${shoe.imageUrl}
    />
    <input
      type="text"
      name="release"
      id="shoe-release"
      placeholder="Release date"  .value=${shoe.release}
    />
    <input
      type="text"
      name="designer"
      id="shoe-designer"
      placeholder="Designer"  .value=${shoe.designer}
    />
    <input
      type="text"
      name="value"
      id="shoe-value"
      placeholder="Value"  .value=${shoe.value}
    />

    <button type="submit">post</button>
  </form>
</div>
</section>
`;


//@submit=${onEdit}


export async function editPage(ctx) {
    const id = ctx.params.id;
    const shoe = await getById(id);

    ctx.render(editTemplate(shoe, createSubmitHandler(onEdit)));

    //създаваме функция, която подаваме като параметър на темплейта и закачаме eventListener
    //деструктурираме дейтата, за да извадим своествата, които ни трябват и които ще изпратим в заявката след Edit

    async function onEdit({
        brand,
        model,
        imageUrl,
        release,
        designer,
        value

    }) {

        if (brand === '' || model === '' || imageUrl === '' || release === '' || designer === '' || value === '') {
            return alert('All fields are requared!')
        }

        await updateShoes(id, {
            brand,
            model,
            imageUrl,
            release,
            designer,
            value
        })

        ctx.page.redirect('/catalog/' + id);

    }


}