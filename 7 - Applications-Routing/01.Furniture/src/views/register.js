import { registerUser } from '../api/users.js';
import { setSessionStorageData } from '../util.js';

let ctx = null;

const registerTemplate = (onRegister) => ctx.html`
    <div class="container">
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Register New User</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${onRegister}>
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
                    <div class="form-group">
                        <label class="form-control-label" for="rePass">Repeat</label>
                        <input class="form-control" id="rePass" type="password" name="rePass">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Register" />
                </div>
            </div>
        </form>
    </div>
`;

export async function showRegister(context) {
    ctx = context;
    ctx.render(registerTemplate(onRegister));

    async function onRegister(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const rePass = formData.get('rePass').trim();
        if (email == '' || password == '') {
            alert('All fields are required!');
            return;
        }
        if (password !== rePass) {
            alert('Passwords don\'t match!');
            return;
        }

        const userData = await registerUser(email, password);
        form.reset();
        setSessionStorageData(userData);
        ctx.updateNav();
        ctx.page.redirect('/catalog');
    }
}