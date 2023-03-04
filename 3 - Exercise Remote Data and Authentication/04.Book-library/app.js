function books() {
    const url = 'http://localhost:3030/jsonstore/collections/books'
    const tableBody = document.getElementsByTagName('tbody')[0];
    const loadAllBooksBtn = document.getElementById('loadBooks');
    const form = document.getElementsByTagName('form')[0];

    loadAllBooksBtn.addEventListener('click', onLoadBooks);
    form.addEventListener('submit', buttonsDelegation);

    async function onLoadBooks(event) {
        // -------------Clear Previus data --------------------
        tableBody.innerHTML = '';
        try {
            const res = await fetch(url);
            if (!res.ok) throw Error('Error');
            const data = await res.json();

            Object.values(data).forEach(bookInfo => {
                const author = bookInfo.author;
                const title = bookInfo.title;
                const id = bookInfo._id
                //console.log(bookInfo._id);

                const tr = document.createElement('tr');

                tableBody.appendChild(tr);
                const tdTitle = document.createElement('td');
                tdTitle.textContent = title;
                tr.appendChild(tdTitle);

                const tdAuthor = document.createElement('td');
                tdAuthor.textContent = author;
                tr.appendChild(tdAuthor);

                const tdButtons = document.createElement('td');
                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.setAttribute('id', `${id}`);
                tdButtons.appendChild(editButton);
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.setAttribute('id', `${id}`);
                tdButtons.appendChild(deleteButton);
                tr.appendChild(tdButtons);

                deleteButton.addEventListener("click", deleteBook);
                editButton.addEventListener("click", editBook);
            })
        } catch (error) {
            alert(error.message);
        }
    }

    async function addBok(e) {
        e.preventDefault()
        //-------------Get all data from form--------------
        const formData = new FormData(e.target);
        const author = formData.get('author');
        const title = formData.get('title');

        try {
            if (!author || !title) throw new Error('The filds must not be empty!');
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ author, title })
            });
            //if beckend returns some error
            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message)
            }
           // onLoadBooks()
            e.target.reset();
        } catch (error) {
            alert(error);
        }
    }


    async function deleteBook(event) {
        const bookId = event.target.id;
        const targetUrl = `${url}/${bookId}`
        try {
            const res = await fetch(targetUrl, {
                method: 'DELETE'
            })
            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message)
            }

            event.target.parentNode.parentNode.remove()
        } catch (error) {
            alert(error)
        }

    }


    function editBook(event) {
        const parentNode = event.currentTarget.parentNode.parentNode;
        const title = parentNode.getElementsByTagName('td')[0].textContent;
        const author = parentNode.getElementsByTagName('td')[1].textContent;
        document.querySelector('input[name="author"]').value = author;
        document.querySelector('input[name="title"]').value = title;
        document.getElementsByTagName('h3')[0].textContent = 'Edit FORM'

        const btns = [...document.getElementsByTagName('button')];
        btns.forEach(btn => {
            if (btn.textContent === 'Submit') {
                localStorage.setItem('bookData', event.currentTarget.id);
                btn.textContent = 'Save';
                //така записваме данните за книгата в local storage на браузера
            }
        })
    }

    //------------------------------buttonsDelegation------------

    function buttonsDelegation(e) {
        // e.preventDefault()
        const currentBtn = e.currentTarget.getElementsByTagName('button')[0];
        if (currentBtn.textContent === "Submit") {
            addBok(e);
        } else if (currentBtn.textContent === "Save") {
            updateElement(e);
        }
    }

    async function updateElement(e) {
        e.preventDefault();
        let id = localStorage.getItem("bookData");
        localStorage.removeItem("bookData");

        //-------------Get all data from form--------------
        const formData = new FormData(e.target);
        const author = formData.get('author');
        const title = formData.get('title');

        e.target.getElementsByTagName('button')[0].textContent = 'Submit';
        e.target.getElementsByTagName('h3')[0].textContent = 'FORM'

        try {
            if (!author || !title) throw new Error('The filds must not be empty!');
            const res = await fetch(`${url}/${id}`, {
                method: 'PUT',
                "Content-Type": "application/json",
                body: JSON.stringify({ author, title })
            })

            //if beckend returns some error
            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message)
            }

            onLoadBooks()
            e.target.reset();

        } catch (error) {

            alert(error);
        }
    }
}
books()