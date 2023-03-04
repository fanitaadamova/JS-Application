async function getInfo() {

    const stopId = document.getElementById('stopId').value;
    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;
    const stopNameElement = document.getElementById('stopName');
    const timeTableElement = document.getElementById('buses');
    const submitBtn = document.getElementById('submit');


    try {
        stopNameElement.textContent = 'Loading...';
        timeTableElement.replaceChildren();
        submitBtn.disabled = true;

        const res = await fetch(url);
        if (res.status !== 200) {
            throw new Error('Stop ID not found!');
        }

        const data = await res.json();
        stopNameElement.textContent = data.name;
        Object.entries(data.buses).forEach(b => {
            const liElement = document.createElement('li');
            liElement.textContent = `Bus ${b[0]} arrives in ${b[1]} minutes`;
            timeTableElement.appendChild(liElement);
        });
        submitBtn.disabled = false;

    } catch (error) {
        stopNameElement.textContent = 'Error';
    }

}