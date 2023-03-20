function solve() {
    //<div id="info"><span class="info">Not Connected</span></div>
    const infoElement = document.querySelector('div#info span.info');
    const departButton = document.getElementById('depart');
    const arriveButton = document.getElementById('arrive');

    let nextStopId = 'depot';
    let stopName;

    async function depart() {

        try {
            const response = await fetch(`http://localhost:3030/jsonstore/bus/schedule/${nextStopId}`);
            if (response.status !== 200) {
                throw new Error('StopID not found!');
            }
            const data = await response.json();
            stopName = data.name;
            nextStopId = data.next;
            infoElement.textContent = `Next stop ${stopName}`;
            departButton.disabled = true;
            arriveButton.disabled = false;

        } catch (error) {
            infoElement.textContent = 'Error';
            departButton.disabled = true;
            arriveButton.disabled = true;

        }
    }

    function arrive() {
        infoElement.textContent = `Arriving at ${stopName}`;
        arriveButton.disabled = true;
        departButton.disabled = false;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();