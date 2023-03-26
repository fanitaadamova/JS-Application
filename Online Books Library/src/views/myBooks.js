import { html } from "../../node_modules/lit-html/lit-html.js";
import { getMyBooks } from '../data/books.js';



let ctx = null;
/*

*/

const myBookTemplate = (myBooks) => html `
<section id="my-books-page" class="my-books">
<h1>My Books</h1>
${myBooks.length > 0 ? html `<ul class="my-books-list">${myBooks.map(bookCard)}</ul>` : html `<p class="no-books">No books in database!</p>`}
</section>`;

const bookCard = (book) => html `
<li class="otherBooks">
<h3>${book.title}</h3>
<p>Type: ${book.type}</p>
<p class="img"><img src="${book.imageUrl}"></p>
<a class="button" href="/catalog/${book._id}">Details</a>
</li>`



export async function showMyBooks(context) {
    ctx = context;
    const userId = ctx.userData?._id;

    const myBooks = await getMyBooks(userId);

    ctx.render(myBookTemplate(myBooks));
}

 