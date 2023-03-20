import { showPost } from "./post.js";

document.querySelector('nav a').addEventListener('click', showPost);
document.querySelector('main').replaceChildren();

showPost();