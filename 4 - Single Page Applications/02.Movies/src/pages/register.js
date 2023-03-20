import { register } from "../api/user.js";

const section = document.getElementById('form-sign-up');
const form = section.querySelector('form');
form.addEventListener('submit', onRegister);

let ctx;

export function registerPage(context){
    ctx = context;
    context.showSection(section);
    context.updateNav();
}

async function onRegister(e){
    e.preventDefault();

    const formData = new FormData(form);

    const {email, password, repeatPassword} = Object.fromEntries(formData);

    if(!email || !password || !repeatPassword) return alert('All fields are required!');
    if(password.length < 6) return alert('Password is too short!');
    if(password != repeatPassword) return alert('Password don\'t match!');

    await register(email, password);
    form.reset();
    ctx.updateNav();
    ctx.goTo('/');
}