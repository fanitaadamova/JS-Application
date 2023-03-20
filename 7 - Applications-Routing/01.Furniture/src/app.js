import { logoutUser } from './api/users.js';
import { html, render, page } from './lib.js';
import { clearSessionStorageData, getSessionStorageData } from './util.js';
import { showCatalog } from './views/catalog.js';
import { showCreate } from './views/create.js';
import { showDetails } from './views/details.js';
import { showEdit } from './views/edit.js';
import { showLogin } from './views/login.js';
import { showMyFurnitures } from './views/myFurniture.js';
import { showRegister } from './views/register.js';
// Get main element on page
const main = document.querySelector('main');
// Add event listener on logout btn
document.getElementById('logoutBtn').addEventListener('click', () => {
    logoutUser();
    clearSessionStorageData();
    updateNav();
    page('/');
});

// Use a page library to change its context to use dependency injection
// When a page is called with one argument, it is executed each time before others and changes the context object
page(decorateContext);
// Links
page('/index.html', '/');
page('/', '/catalog');
page('/catalog', showCatalog);
page('/catalog/:id', showDetails);
page('/my-furniture', showMyFurnitures);
page('/edit/:id', showEdit);
page('/create', showCreate);
page('/login', showLogin);
page('/register', showRegister);

// Start apllication
updateNav();
page.start();

// Add more info to context. Dependency injection
function decorateContext(ctx, next) {
    ctx.render = customRender;
    ctx.html = html;
    ctx.updateNav = updateNav;
    ctx.userData = getSessionStorageData();
    next();
}
// Create a custom render function to render the current page. With this, we don't need to export the main element to other pages
function customRender(currentTemplate) {
    render(currentTemplate, main);
}
// Check which buttons to display
function updateNav() {
    const nav = document.querySelector('nav');
    const user = nav.querySelector('#user');
    const guest = nav.querySelector('#guest');
    const userData = getSessionStorageData();

    if (userData) {
        user.style.display = 'inline-block';
        guest.style.display = 'none';
    } else {
        user.style.display = 'none';
        guest.style.display = 'inline-block';
    }
}