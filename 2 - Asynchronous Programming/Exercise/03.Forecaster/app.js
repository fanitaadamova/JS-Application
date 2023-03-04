function attachEvents() {
    const locationInput = document.getElementById('location');
    const getWeatherButn = document.getElementById('submit');
    const forecast = document.querySelector('div#forecast');
    const currentWeather = document.querySelector('div#current');
    const upcomingWeather = document.querySelector('div#upcoming');

    const conditions = {
        Sunny: '&#x2600', // ☀
        "Partly sunny": '&#x26C5', // ⛅
        Overcast: '&#x2601', // ☁
        Rain: '&#x2614', // ☂
        Degrees: '&#176'   // °
    };

    getWeatherButn.addEventListener('click', getWeather);

    function getWeather() {
        fetch('http://localhost:3030/jsonstore/forecaster/locations')
            .then(res => res.json())
            .then(data => {
                const cityIndex = data.findIndex(el => el.name === locationInput.value)
                forecast.style.display = 'block';
                if (cityIndex === -1) {
                    throw new Error();
                }

                let cityCode = data[cityIndex].code;
                console.log(cityCode);

                //Current Weather
                fetch(`http://localhost:3030/jsonstore/forecaster/today/${cityCode}`)
                    .then(res => res.json())
                    .then(data => {
                        //Main div
                        const forecastDiv = document.createElement('div');
                        forecastDiv.className = 'forecasts';

                        let conditionSynbol = document.createElement('span')
                        conditionSynbol.className = 'condition symbol';
                        conditionSynbol.innerHTML = conditions[data.forecast.condition];
                        forecastDiv.appendChild(conditionSynbol);

                        let conditionSpan = document.createElement('span')
                        conditionSpan.className = 'condition';
                        //Span 1
                        let span1 = document.createElement('span');
                        span1.className = 'forecast-data';
                        span1.textContent = data.name;
                        conditionSpan.appendChild(span1);
                        //Span 2
                        let span2 = document.createElement('span')
                        span2.className = 'forecast-data';
                        span2.innerHTML = `${data.forecast.low}&#176;/${data.forecast.high}&#176;`;
                        conditionSpan.appendChild(span2);
                        //Span 3
                        let span3 = document.createElement('span');
                        span3.className = 'forecast-data';
                        span3.textContent = data.forecast.condition;
                        conditionSpan.appendChild(span3);

                        forecastDiv.appendChild(conditionSpan);
                        currentWeather.appendChild(forecastDiv);


                    })

                //Upcoming Weather
                fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${cityCode}`)
                    .then(res => res.json())
                    .then(data => {
                        //Main div
                        const fcInfo = document.createElement('div');
                        fcInfo.className = 'forecast-info';
                        //Each days from the array spans
                        data.forecast.forEach(el => {
                            //Main span
                            const upcoming = document.createElement('span');
                            upcoming.className = 'upcoming';

                            let symbol = document.createElement('span')
                            symbol.className = 'symbol';
                            symbol.innerHTML = conditions[el.condition];
                            upcoming.appendChild(symbol);
                            //Forcast data first span
                            let fcData = document.createElement('span');
                            fcData.className = 'forecast-data';
                            fcData.innerHTML = `${el.low}&#176;/${el.high}&#176;`;
                            upcoming.appendChild(fcData);
                            //Forcast data second span
                            let fcData2 = document.createElement('span');
                            fcData2.className = 'forecast-data';
                            fcData2.textContent = el.condition;
                            upcoming.appendChild(fcData2);

                            fcInfo.appendChild(upcoming);
                        });

                        upcomingWeather.appendChild(fcInfo);
                    })
                    .catch(() => (forecast.textContent = 'Error'));
            })
            .catch(() => (forecast.textContent = 'Error'));
    }

}

attachEvents();