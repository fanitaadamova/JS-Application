import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../data/auth.js";
import { createSubmitHandler } from "../util.js";

const registerTemplate = (onRegister) => html`
<h1>Register page</h1>
<form @submit=${onRegister}>
  <label>Email: <input type="text" name="email"></label>
  <label>Password: <input type="password" name="password"></label>
  <label>Repeat: <input type="password" name="repass"></label>
  <button>Register</button>
</form>`


export function registerPage(ctx) {
    ctx.render(registerTemplate(createSubmitHandler(onRegister)));

    //TODO change user object based on requarements
    async function onRegister({ email, password, repass }, form) {
        if (email == '' || password == '') {
            return alert('All fields are requared')
        }
        if (password != repass) {
            return alert('Password do not match')
        }

        await register(email, password);
        form.reset();
        //TODO used redirect location from requarements
        ctx.page.redirect('/');
    }


}