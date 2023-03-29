import { html } from "../../node_modules/lit-html/lit-html.js";

//TODO replace with actual layout - постави HTML структурата Navigation, ако е логнат или не, какви бутони вижда user-a
export const layoutTemplate = (userData, content) => html`
<header>
<!-- Navigation -->
<h1><a href="/">Orphelp</a></h1>

<nav>
    <a href="/catalog">Dashboard</a>


    ${userData ? html`
    <div id="user">
        <a href="/my-posts">My Posts</a>
        <a href="/create">Create Post</a>
        <a id="logout-btn" href="/logout">Logout</a>
    </div>` : html`<div id="guest">
    <a href="/login">Login</a>
    <a href="/register">Register</a>
</div>`}


</nav>
</header>

<!-- Main Content -->
<main id="main-content">
${content}
</main>`


//! важно - не съм сигурна, че този ${content} трабяв да е там, да видя дали не е извън main-a







