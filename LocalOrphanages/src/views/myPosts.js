import { html } from "../../node_modules/lit-html/lit-html.js";
import { getMyPosts } from '../data/posts.js';

let ctx = null;

const myBookTemplate = (myPosts) => html `
<section id="my-posts-page">
<h1 class="title">My Posts</h1>
${myPosts.length > 0 ? html `<div class="my-posts">${myPosts.map(postCard)}</div>` : html `<h1 class="title no-posts-title">You have no posts yet!</h1>`}
</section>`;

const postCard = (post) => html `
<div class="post">
<h2 class="post-title">${post.title}</h2>
<img class="post-image" src="${post.imageUrl}" alt="Material Image">
<div class="btn-wrapper">
    <a href="/catalog/${post._id}" class="details-btn btn">Details</a>
</div>
</div>`



export async function showMyPosts(context) {
    ctx = context;
    const userId = ctx.userData?._id;

    const myPosts = await getMyPosts(userId);

    ctx.render(myBookTemplate(myPosts));
}

 