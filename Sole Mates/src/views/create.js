import { html } from "../../node_modules/lit-html/lit-html.js";
import { createShoes } from "../data/shoes.js";

import { createSubmitHandler } from "../util.js";

const createTemplate = (onCreate) => html`
<section id="create">
<div class="form">
  <h2>Add item</h2>
  <form @submit=${onCreate} class="create-form">
    <input
      type="text"
      name="brand"
      id="shoe-brand"
      placeholder="Brand"
    />
    <input
      type="text"
      name="model"
      id="shoe-model"
      placeholder="Model"
    />
    <input
      type="text"
      name="imageUrl"
      id="shoe-img"
      placeholder="Image url"
    />
    <input
      type="text"
      name="release"
      id="shoe-release"
      placeholder="Release date"
    />
    <input
      type="text"
      name="designer"
      id="shoe-designer"
      placeholder="Designer"
    />
    <input
      type="text"
      name="value"
      id="shoe-value"
      placeholder="Value"
    />

    <button type="submit">post</button>
  </form>
</div>
</section>`



export function createPage(ctx) {
    ctx.render(createTemplate(createSubmitHandler(onCreate)));
    //създаваме функция, която подаваме като параметър на темплейта и закачаме eventListener
    //деструктурираме дейтата, за да извадим своествата, които ни трябват и които ще изпратим в заявката след Edit
    async function onCreate({
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

        await createShoes({
            brand,
            model,
            imageUrl,
            release,
            designer,
            value

        })

        ctx.page.redirect('/catalog');

    }





}