const loginForm = document.querySelector('form');
document.getElementById('user').style.display = 'none';

loginForm.addEventListener('submit', userLogin);

async function userLogin(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        const res = await fetch('http://localhost:3030/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        //if beckend returns some error
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message)
        }

        const data = await res.json();
        const userData = {
            email: data.email,
            id: data._id,
            token: data.accessToken
        }
        //така записваме данните за юзера в local storage на браузера
        localStorage.setItem('userData', JSON.stringify(userData));
        window.location = ('./index.html')
    } catch (error) {
        document.querySelector('form').reset();
        alert(error.message);
    }
}