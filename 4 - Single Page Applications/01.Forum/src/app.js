import { showHome } from "./home.js";
//---------Only for testing--------------
//window.showHome = showHome;
//window.showDitails = showDitails;

document.getElementById('homeLink').addEventListener('click', showHome);

//---------Start application in home view--------------
showHome();
