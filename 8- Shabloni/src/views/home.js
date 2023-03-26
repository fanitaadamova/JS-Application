import { html } from "../../node_modules/lit-html/lit-html.js";

//TODO replace with actual view
const homeTemplate = () => html `
<h1>Home page</h1>
<p>Wellcome to site</p>`


export function homePage(ctx) {
    ctx.render(homeTemplate())
}