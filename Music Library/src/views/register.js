import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../data/auth.js";
import { createSubmitHandler } from "../util.js";

const registerTemplate = (onRegister) => html `
<section id="register">
<div class="form">
  <h2>Register</h2>
  <form class="login-form" @submit=${onRegister}>
    <input type="text" name="email" id="register-email" placeholder="email" />
    <input type="password" name="password" id="register-password" placeholder="password" />
    <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
    <button type="submit">register</button>
    <p class="message">Already registered? <a href="/login">Login</a></p>
  </form>
</div>
</section>`



export function registerPage(ctx) {
    ctx.render(registerTemplate(createSubmitHandler(onRegister)));

    //TODO change user object based on requarements
    async function onRegister({ email, password, ["re-password"]: repass }, form) {
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