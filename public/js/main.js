import {
    citySearch, searchBtn, dashboard, loading, errorMessage, initialState
} from './domRefs.js';
import { createClockNumbers, updateClock } from './clock.js';
import { updateWeatherUI, setWeatherIcon } from './weather.js';
import { updateNewsUI } from './news.js';

document.addEventListener('DOMContentLoaded', function () {
    createClockNumbers();
    updateClock();
    setInterval(updateClock, 1000);

    loadDefaultCityWeather();

    searchBtn.addEventListener('click', searchCity);
    citySearch.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            searchCity();
        }
    });

    function loadDefaultCityWeather() {
        const defaultCity = 'New York';
        document.getElementById('defaultCityName').textContent = defaultCity;

        fetch(`/api/weather/${defaultCity}`)
            .then(res => res.json())
            .then(data => {
                document.getElementById('defaultTemperature').textContent = `${Math.round(data.main.temp)}°C`;
                document.getElementById('defaultWeatherDescription').textContent = data.weather[0].description;
                document.getElementById('defaultHumidity').textContent = `${data.main.humidity}%`;
                document.getElementById('defaultWind').textContent = `${data.wind.speed} km/h`;
                document.getElementById('defaultFeelsLike').textContent = `${Math.round(data.main.feels_like)}°C`;
                document.getElementById('defaultPressure').textContent = `${data.main.pressure} hPa`;

                const condition = data.weather[0].main.toLowerCase();
                const defaultWeatherIcon = document.getElementById('defaultWeatherIcon');
                setWeatherIcon(defaultWeatherIcon, condition);
            })
            .catch(() => {
                document.getElementById('defaultTemperature').textContent = '22°C';
                document.getElementById('defaultWeatherDescription').textContent = 'Weather data unavailable';
            });
    }

    function searchCity() {
        const city = citySearch.value.trim();
        if (!city) return;

        loading.classList.remove('hidden');
        dashboard.classList.add('hidden');
        errorMessage.classList.add('hidden');
        initialState.classList.add('hidden');

        Promise.all([
            fetch(`/api/weather/${city}`).then(res => {
                if (!res.ok) throw new Error('Weather API error');
                return res.json();
            }),
            fetch(`/api/news/${city}`).then(res => {
                if (!res.ok) throw new Error('News API error');
                return res.json();
            })
        ])
            .then(([weatherData, newsData]) => {
                updateWeatherUI(weatherData);
                updateNewsUI(newsData.articles || []);
                loading.classList.add('hidden');
                dashboard.classList.remove('hidden');
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                loading.classList.add('hidden');
                errorMessage.classList.remove('hidden');
            });
    }
});
