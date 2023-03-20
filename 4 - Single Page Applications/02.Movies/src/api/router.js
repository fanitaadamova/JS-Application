let ctx;
export function initialize(links){

    const main = document.querySelector('main');
    document.querySelector('nav').addEventListener('click', navClick);

    const context = {
        showSection,
        updateNav,
        goTo
    }
    ctx = context;
    return context;

    function showSection(section){
        main.replaceChildren(section)
    }

    function navClick(e){
        e.preventDefault();
        if(e.target.tagName == 'A'){
            const url = new URL(e.target.href);
            goTo(url.pathname)
        }
    }

    function goTo(name, ...params){
        const handler = links[name];
        if(typeof(handler) == 'function'){
            handler(context, ...params);
        }
    }

    function updateNav(){
        const user = JSON.parse(localStorage.getItem('userData'))
        if(user){
            document.querySelectorAll('.user').forEach(el => el.style.display = 'block');
            document.querySelectorAll('.guest').forEach(el => el.style.display = 'none');
            document.getElementById('welcome-msg').textContent = `Welcome, ${user.email}`;
        }else{
            document.querySelectorAll('.user').forEach(el => el.style.display = 'none');
            document.querySelectorAll('.guest').forEach(el => el.style.display = 'block');
        }
    }


}
export {
    ctx
}