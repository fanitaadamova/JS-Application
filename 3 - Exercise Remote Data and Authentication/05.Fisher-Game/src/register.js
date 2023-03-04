const registerForm = document.querySelector('form');
document.getElementById('user').style.display = 'none';

registerForm.addEventListener('submit', onUserRegistration);

const url = 'http://localhost:3030/users/register';
async function onUserRegistration(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const { email, password, rePass } = Object.fromEntries(formData);
    // console.log(email, password, rePass);
    try {
        if ([...formData.values()].some(el => el === '')) {
            throw new Error('Input is not correct!')
        } else if (password != rePass) {
            throw new Error('The passwords do not match!')
        }

        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, rePass })
        })
        //if beckend return same error
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message)
        }

        const data = await res.json();
        const user = {
            email: data.email,
            id: data._id,
            token: data.accessToken
        }
     //така записваме данните за юзера в local storage на браузера
     localStorage.setItem('userData', JSON.stringify(user));
     window.location = ('./index.html')

    } catch (error) {
        alert(error.message);
        document.querySelector('form').reset();
    }

}