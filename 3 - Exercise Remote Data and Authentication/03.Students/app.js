async function students() {
    const url = 'http://localhost:3030/jsonstore/collections/students';
    const table = document.querySelector('#results tbody');

    const res = await fetch(url);
    const data = await res.json();
    Object.values(data).forEach(student => {
        const firstName = student.firstName;
        const lastName = student.lastName;
        const facultyNumber = student.facultyNumber;
        const grade = Number(student.grade);
        //create tr with all components
        const tr = document.createElement('tr');
        const firstNameCell = tr.insertCell(0);
        firstNameCell.innerText = firstName;
        const lastNameCell = tr.insertCell(1);
        lastNameCell.innerText = lastName;
        const facultyNumberCell = tr.insertCell(2);
        facultyNumberCell.innerText = facultyNumber;
        const gradeCell = tr.insertCell(3);
        gradeCell.innerText = grade;

        table.appendChild(tr);
    })

    document.getElementById('submit').addEventListener('click', onClickSubmit);

    async function onClickSubmit(event) {
        event.preventDefault();
        const firstNameInput = document.getElementsByName('firstName')[0];
        const lastNameInput = document.getElementsByName('lastName')[0];
        const facultyNumberInput = document.getElementsByName('facultyNumber')[0];
        const gradeInput = document.getElementsByName('grade')[0];

        if (!firstNameInput.value || !lastNameInput.value || !facultyNumberInput.value
            || !gradeInput.value || isNaN(gradeInput.value)) {
            return alert('Wrong input data!')
        }

        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                firstName: firstNameInput.value,
                lastName: lastNameInput.value,
                facultyNumber: facultyNumberInput.value,
                grade: gradeInput.value
            })
        })

        const tr = document.createElement('tr');
        const firstNameCell = tr.insertCell(0);
        firstNameCell.innerText = firstNameInput.value;
        const lastNameCell = tr.insertCell(1);
        lastNameCell.innerText = lastNameInput.value;
        const facultyNumberCell = tr.insertCell(2);
        facultyNumberCell.innerText = facultyNumberInput.value;
        const gradeCell = tr.insertCell(3);
        gradeCell.innerText = Number(gradeInput.value);
        table.appendChild(tr);


        firstNameInput.value = '';
        lastNameInput.value = '';
        facultyNumberInput.value = '';
        gradeInput.value = '';
    }

}

students()