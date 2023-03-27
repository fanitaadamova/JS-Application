import { html } from "../../node_modules/lit-html/lit-html.js";
import { getById, updateAlbum } from "../data/albums.js";
import { createSubmitHandler } from "../util.js";

//слагаме .value=${album.imageUrl} и.т.н
const editTemplate = (albumCurrent, onEdit) => html `
<section id="edit">
    <div class="form">
        <h2>Edit Album</h2>
        <form @submit=${onEdit} class="edit-form">
            <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" .value=${albumCurrent.singer} />
            <input type="text" name="album" id="album-album" placeholder="Album" .value=${albumCurrent.album} />
            <input type="text" name="imageUrl" id="album-img" placeholder="Image url" .value=${albumCurrent.imageUrl} />
            <input type="text" name="release" id="album-release" placeholder="Release date" .value=${albumCurrent.release} />
            <input type="text" name="label" id="album-label" placeholder="Label" .value=${albumCurrent.label} />
            <input type="text" name="sales" id="album-sales" placeholder="Sales" .value=${albumCurrent.sales} />
            <button type="submit">post</button>
        </form>
    </div>
</section>
`;





export async function editPage(ctx) {
  const id = ctx.params.id;
  const albumCurrent = await getById(id);

  ctx.render(editTemplate(albumCurrent, createSubmitHandler(onEdit)));

  //създаваме функция, която подаваме като параметър на темплейта и закачаме eventListener
  //деструктурираме дейтата, за да извадим своествата, които ни трябват и които ще изпратим в заявката след Edit

  async function onEdit({
    singer,
    album, 
    imageUrl, 
    release, 
    label, 
    sales
    
  })   {
    
    if (singer === '' || album === '' || imageUrl === '' || release === ''|| label === '' || sales === '') {
        return alert('All fields are requared!')
    }

       await updateAlbum(id, {
        singer,
        album, 
        imageUrl, 
        release, 
        label, 
        sales
          
       })

       ctx.page.redirect('/catalog/' + id);
      
   }
   

}