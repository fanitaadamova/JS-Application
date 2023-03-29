import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../data/auth.js";
import { createSubmitHandler } from "../util.js";

const registerTemplate = (onRegister) => html`
<section id="register-page" class="auth">
<form id="register" @submit=${onRegister}>
    <h1 class="title">Register</h1>

    <article class="input-group">
        <label for="register-email">Email: </label>
        <input type="email" id="register-email" name="email">
    </article>

    <article class="input-group">
        <label for="register-password">Password: </label>
        <input type="password" id="register-password" name="password">
    </article>

    <article class="input-group">
        <label for="repeat-password">Repeat Password: </label>
        <input type="password" id="repeat-password" name="repeatPassword">
    </article>

    <input type="submit" class="btn submit-btn" value="Register">
</form>
</section>
`


export function registerPage(ctx) {
    ctx.render(registerTemplate(createSubmitHandler(onRegister)));

    //TODO change user object based on requarements - виж как се преименува ОТ re-password" НА repass при деструктуриране
    async function onRegister({ email, password, ["repeatPassword"]: repass }, form) {
        if (email == '' || password == '') {
            return alert('All fields are requared')
        }
        if (password != repass) {
            return alert('Password do not match')
        }

        await register(email, password);
        form.reset();
        //TODO used redirect location from requarements
        ctx.page.redirect('/catalog');
    }


}




