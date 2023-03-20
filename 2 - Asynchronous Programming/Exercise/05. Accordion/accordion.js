async function solution() {
    const mainElement = document.getElementById('main');

    try {
        const res = await fetch('http://localhost:3030/jsonstore/advanced/articles/list');
        if (!res.ok) throw new Error();
        const data = await res.json();

        data.forEach(element => {
            const divAccordion = document.createElement('div');
            divAccordion.className = 'accordion';
            mainElement.appendChild(divAccordion);

            const divHead = document.createElement('div');
            divHead.className = 'head';
            divAccordion.appendChild(divHead);

            const span = document.createElement('span');
            span.textContent = element["title"];
            divHead.appendChild(span);

            const button = document.createElement('button');
            button.className = 'button';
            button.setAttribute('id', `${element["_id"]}`);
            button.textContent = 'More';
            divHead.appendChild(button);
            //Create hiden div
            const divExtra = document.createElement('div');
            divExtra.className = 'extra';
            divAccordion.appendChild(divExtra);
            const p = document.createElement('p');
            divExtra.appendChild(p);
            divExtra.style.display = 'none';
        });

        const btns = [...document.getElementsByTagName('button')];
        btns.forEach(btn => btn.addEventListener('click', showHide));

        async function showHide(event) {
            try {
                if (event.target.textContent === "More") {
                    const id = event.target.id;
                    // console.log(id);
                    const res = await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${id}`);
                    if (!res.ok) throw new Error();
                    const data = await res.json();
                    const p = event.target.parentNode.parentNode.getElementsByTagName('p')[0];
                    p.textContent = data.content;
                    event.target.parentNode.parentNode.getElementsByClassName('extra')[0].style.display = 'block';
                    event.target.textContent = "Less"
                } else {
                    event.target.parentNode.parentNode.getElementsByClassName('extra')[0].style.display = 'none';
                    event.target.textContent = "More"
                }

            } catch (error) {
                console.log(error);
            }
        }
    } catch (error) {
        console.log(error);
    }

}
solution()