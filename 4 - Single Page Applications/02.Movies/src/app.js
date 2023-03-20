import { deleteMovie, likeMovie } from "./api/data.js";
import { initialize } from "./api/router.js";
import { logout } from "./api/user.js";
import { addMoviePage } from "./pages/addMovie.js";
import { editMoviePage } from "./pages/editMovie.js";
import { homePage } from "./pages/home.js";
import { loginPage } from "./pages/login.js";
import { movieInfoPage } from "./pages/movieInfo.js";
import { registerPage } from "./pages/register.js";

document.getElementById('all').remove();

const links = {
    '/': homePage,
    '/add': addMoviePage,
    '/movieInfo': movieInfoPage,
    '/editMovie': editMoviePage,
    '/delMovie': deleteMovie,
    '/likeMovie': likeMovie,
    '/login': loginPage,
    '/register': registerPage,
    '/logout': logoutFunc
}

async function logoutFunc(){
    await logout();
    router.updateNav();
    router.goTo('/login');
}

const router = initialize(links);

router.goTo('/')
router.updateNav();

