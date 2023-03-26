import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../data/auth.js";
import { createSubmitHandler } from "../util.js";

const registerTemplate = (onRegister) => html`
<section id="register-page" class="register">
<form id="register-form" action="" method="" @submit=${onRegister}>
    <fieldset>
        <legend>Register Form</legend>
        <p class="field">
            <label for="email">Email</label>
            <span class="input">
                <input type="text" name="email" id="email" placeholder="Email">
            </span>
        </p>
        <p class="field">
            <label for="password">Password</label>
            <span class="input">
                <input type="password" name="password" id="password" placeholder="Password">
            </span>
        </p>
        <p class="field">
            <label for="repeat-pass">Repeat Password</label>
            <span class="input">
                <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
            </span>
        </p>
        <input class="button submit" type="submit" value="Register">
    </fieldset>
</form>
</section>`


export function registerPage(ctx) {
    ctx.render(registerTemplate(createSubmitHandler(onRegister)));

    //TODO change user object based on requarements - виж как се преименува ОТ re-password" НА repass при деструктуриране
    async function onRegister({ email, password, ["confirm-pass"]: repass }, form) {
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




