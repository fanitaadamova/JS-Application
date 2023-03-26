import { html } from "../../node_modules/lit-html/lit-html.js";

//TODO replace with actual layout - постави HTML структурата Navigation, ако е логнат или не, какви бутони вижда user-a
export const layoutTemplate = (userData, content) => html`
<header id="site-header">
<!-- Navigation -->
<nav class="navbar">
    <section class="navbar-dashboard">
        <a href="/catalog">Dashboard</a>

  ${userData ? html`
  <div id="user">
            <span>Welcome, ${userData.email}</span>
            <a class="button" href="/my-books">My Books</a>
            <a class="button" href="/create">Add Book</a>
            <a class="button" href="/logout">Logout</a>
        </div>` : html`<div id="guest">
        <a class="button" href="/login">Login</a>
        <a class="button" href="/register">Register</a>
    </div>`}

</nav>
</header>

<main id="site-content">
${content}
</main>
<footer id="site-footer">
<p>@OnlineBooksLibrary</p>
</footer>`


//! важно - не съм сигурна, че този ${content} трабяв да е там

// <a class="button" href="#">My Books</a>      - да добавя линкове
