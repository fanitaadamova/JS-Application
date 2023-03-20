import { html } from '../../../node_modules/lit-html/lit-html.js'


import { addFormTemplate, editFormTemplate } from './formTemplates.js'
import { loadButtonTemplate } from './loadButton.js'
import { tableTemplate } from './tableTemplate.js'

export const mainTemplates = () => {
    return html `
    ${loadButtonTemplate()} ${tableTemplate()}
    <form id="add-form">${addFormTemplate()}</form>
    <form id="edit-form" style="display: none"></form>`
} 

//${editFormTemplate()}
