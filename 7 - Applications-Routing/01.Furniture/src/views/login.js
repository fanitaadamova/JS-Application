import { loginUser } from '../api/users.js';
import { setSessionStorageData } from '../util.js';

let ctx = null;

const loginTemplate = (loginFn) => ctx.html`
<div class="container">
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Login User</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    <form @submit=${loginFn}>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="email">Email</label>
                    <input class="form-control" id="email" type="text" name="email">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="password">Password</label>
                    <input class="form-control" id="password" type="password" name="password">
                </div>
                <input type="submit" class="btn btn-primary" value="Login" />
            </div>
        </div>
    </form>
</div>
`;

export async function showLogin(context) {
    ctx = context;
    ctx.render(loginTemplate(loginFn));

    async function loginFn(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        if (email == '' || password == '') {
            alert('All fields are required!');
            return;
        }

        const userData = await loginUser(email, password);
        form.reset();
        setSessionStorageData(userData);
        ctx.updateNav();
        ctx.page.redirect('/catalog');
    }
}