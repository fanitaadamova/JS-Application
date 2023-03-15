import { html, render } from '../node_modules/lit-html/lit-html.js'
import { getAllBooks, createBook, updateBook, deleteBook } from "./src/api.js"
import { mainTemplates } from './src/templates/mainTeplate.js';
import { tableRowsTemplete } from './src/templates/tableRowsTemplate.js';
import { editButtonHandler } from './src/actions.js';



const documentBoby = document.querySelector('body');
render(mainTemplates(), documentBoby)

documentBoby.querySelector("#loadBooks").addEventListener("click", async () => {
    const booksdata = await getAllBooks();
    const section = documentBoby.querySelector('table tbody')
    const books = [];
    for (const id in booksdata) {
        books.push({
            author: booksdata[id].author,
            title: booksdata[id].title,
            _id: id,
        })
    }
    const context = {
        books,
        deleteFunction,
        editButtonHandler
    }

    render(tableRowsTemplete(context), section)
})

const addFormElement = document.querySelector('#add-form');
addFormElement.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(addFormElement);
    const author = formData.get('author');
    const title = formData.get('title');
 console.log(title);
    if (author == "" || title == "" ) {
       return alert("Please field all fields!");
    }

    const book = {
        author,
        title
    }

    await createBook(book).then(data =>{
        addFormElement.reset();
        documentBoby.querySelector("#loadBooks").click();
    })
})

const editFormElement = documentBoby.querySelector('#edit-form');
editFormElement.addEventListener("submit", (e) =>{
    e.preventDefault();
    const formData = new FormData(editFormElement);
    console.log();
    const id = formData.get('id');
    const author = formData.get('author');
    const title = formData.get('title');

    if (author == "" || title == "") {
       return alert("Please field all fields!");
    }

    const book = {
        author,
        title
    }

    updateBook(id, book).then(() =>{
        documentBoby.querySelector("#loadBooks").click();
        editFormElement.style.display = 'none';
        editFormElement.reset();
        addFormElement.style.display = 'block';
    })

})


function deleteFunction(id) {
    deleteBook(id);
    documentBoby.querySelector("#loadBooks").click();
}