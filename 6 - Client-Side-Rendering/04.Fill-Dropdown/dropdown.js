import { html, render } from '../node_modules/lit-html/lit-html.js'

const url = 'http://localhost:3030/jsonstore/advanced/dropdown';

//-----------Get all data from server-----------
async function getData() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error()
        }
        return await response.json();

    } catch (error) {
        alert(error)
    }

}

const options = Object.values(await getData())
//----------------Show All items------------------------------
const optionsTemplate = (data) => html`
<select id="menu"> ${data.map(town => html`
<option value=${town._id}>${town.text}</option>`
)}    
</select>`

const div = document.querySelector('div')
update(options);

function update(options) {
    const result = optionsTemplate(options);
    render(result, div);
}

//----------------Add New items------------------------------
const form = document.querySelector('form')
form.addEventListener('submit', addItem)

async function addItem(event) {
    event.preventDefault();
    const text = document.getElementById('itemText').value;

    if (text !== '') {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        })
       //-----------reload all items and reset form fields
        options.push(await response.json())
        update(options);
        form.reset();
    }

}



