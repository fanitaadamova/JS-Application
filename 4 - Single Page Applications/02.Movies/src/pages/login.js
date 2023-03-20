import { login } from "../api/user.js";

const section = document.getElementById('form-login');
const form = section.querySelector('form');
form.addEventListener('submit', onLogin);

let ctx;

export function loginPage(context){
    ctx = context;
    context.showSection(section);
    context.updateNav();
}

async function onLogin(e){
    e.preventDefault();

    const formData = new FormData(form);

    const email = formData.get('email');
    const password = formData.get('password');

    if(!email || ! password) return alert('All fields are required!');

    await login(email, password);
    form.reset();
    ctx.updateNav();
    ctx.goTo('/');
    
}