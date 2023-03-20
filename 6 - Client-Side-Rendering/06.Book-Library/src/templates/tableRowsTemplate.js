import { html } from '../../../node_modules/lit-html/lit-html.js'

export const tableRowsTemplete = (context) => html `
${context.books.map(b => bookRowTemplete(b, context.deleteFunction, context.editButtonHandler))}`


export const bookRowTemplete = (book, deleteFunc, updateHendler) => {
    return  html `
    <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>
            <button @click = ${updateHendler.bind(null,book._id)}>Edit</button>
            <button @click = ${deleteFunc.bind(null, book._id)}>Delete</button>
        </td>
    </tr>`
}