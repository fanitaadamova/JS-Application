import { html } from "../../node_modules/lit-html/lit-html.js";
import { createMeme } from "../data/memes.js";

import { createSubmitHandler } from "../util.js";

const createTemplate = (onCreate) => html`
<section id="create-meme">
<form id="create-form" @submit=${onCreate}>
    <div class="container">
        <h1>Create Meme</h1>
        <label for="title">Title</label>
        <input id="title" type="text" placeholder="Enter Title" name="title">
        <label for="description">Description</label>
        <textarea id="description" placeholder="Enter Description" name="description"></textarea>
        <label for="imageUrl">Meme Image</label>
        <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
        <input type="submit" class="registerbtn button" value="Create Meme">
    </div>
</form>
</section>`



export function createPage(ctx) {
  ctx.render(createTemplate(createSubmitHandler(onCreate)));
  //създаваме функция, която подаваме като параметър на темплейта и закачаме eventListener
  //деструктурираме дейтата, за да извадим своествата, които ни трябват и които ще изпратим в заявката след Edit
  async function onCreate({
    title,
    description,
    imageUrl

  }) {
    if (title === '' || description === '' || imageUrl === '') {
      //Бонус точки
      document.getElementById('errorBox').style.display = 'inline-block'
      document.querySelector('.notification span').textContent = 'All fields are requared'
      return alert('All fields are requared!')
    }

    await createMeme({
      title,
      description,
      imageUrl
    })
    //Бонус точки
    document.getElementById('errorBox').style.display = 'none'
    ctx.page.redirect('/catalog');

  }

}