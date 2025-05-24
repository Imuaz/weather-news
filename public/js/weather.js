import { cityName, currentDate, temperature, weatherDescription, humidity, wind, feelsLike, pressure, weatherIcon } from './domRefs.js';

export function setWeatherIcon(iconElement, condition) {
    if (condition.includes('clear')) iconElement.textContent = '☀️';
    else if (condition.includes('cloud')) iconElement.textContent = '☁️';
    else if (condition.includes('rain')) iconElement.textContent = '🌧️';
    else if (condition.includes('snow')) iconElement.textContent = '❄️';
    else if (condition.includes('thunder')) iconElement.textContent = '⛈️';
    else if (condition.includes('mist') || condition.includes('fog')) iconElement.textContent = '🌫️';
    else iconElement.textContent = '⛅';
}

export function updateWeatherUI(data) {
    cityName.textContent = data.name;
    currentDate.textContent = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    humidity.textContent = `${data.main.humidity}%`;
    wind.textContent = `${data.wind.speed} km/h`;
    feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
    pressure.textContent = `${data.main.pressure} hPa`;

    const condition = data.weather[0].main.toLowerCase();
    setWeatherIcon(weatherIcon, condition);
}