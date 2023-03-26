import { html } from "../../node_modules/lit-html/lit-html.js";

//TODO replace with actual layout - currently there is only for test
export const layoutTemplate = (userData, content) => html `
<nav>
    <a href="/">Home</a>
    ${userData ? html`
    <a href="/logout">Logout</a>` : html `
    <a href="/login">Login</a>
    <a href="/register">Register</a>`}
</nav>
<main>
      ${content}
</main>`