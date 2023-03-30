import { html } from "../../node_modules/lit-html/lit-html.js";
import { getMyMemes } from '../data/memes.js';

let ctx = null;

const myMemeTemplate = (myMemes) => html `
<section id="user-profile-page" class="user-profile">
<article class="user-info">
    <img id="user-avatar-url" alt="user-profile" src="/images/${ctx.userData.gender}.png">
    <div class="user-content">
        <p>Username: ${ctx.userData.username}</p>
        <p>Email: ${ctx.userData.email}</p>
        <p>My memes count: ${myMemes.length}</p>
    </div>
</article>
<h1 id="user-listings-title">User Memes</h1>
${myMemes.length > 0 ? html `<div class="user-meme-listings">${myMemes.map(memeCard)}</div>` : html `<p class="no-memes">No memes in database.</p>`}
</section>`;

const memeCard = (meme) => html `
<div class="user-meme">
<p class="user-meme-title">${meme.title}</p>
<img class="userProfileImage" alt="meme-img" src="${meme.imageUrl}">
<a class="button" href="/catalog/${meme._id}">Details</a>
</div>`





export async function showMyMemes(context) {
    ctx = context;
    const userId = ctx.userData?._id;

    const myMemes = await getMyMemes(userId);

    ctx.render(myMemeTemplate(myMemes));
}

 