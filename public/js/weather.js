import {
  cityName, currentDate, temperature, weatherDescription,
  humidity, wind, feelsLike, pressure, weatherIcon
} from './domRefs.js';

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

// 🌍 Detect city using GPS (fallback to IP)
export async function detectUserCity() {
    return new Promise((resolve) => {
        // Use GPS if available
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        const { latitude, longitude } = position.coords;
                        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                        const data = await res.json();

                        const city = data?.address?.city ||
                                     data?.address?.town ||
                                     data?.address?.village ||
                                     data?.address?.state ||
                                     null;

                        if (city) {
                            resolve(city);
                        } else {
                            const ipCity = await fallbackToIP();
                            resolve(ipCity);
                        }
                    } catch (err) {
                        console.error('Error in geolocation reverse lookup:', err);
                        fallbackToIP().then(resolve);
                    }
                },
                (error) => {
                    console.warn('Geolocation denied or unavailable:', error);
                    fallbackToIP().then(resolve);
                },
                { timeout: 7000 }
            );
        } else {
            fallbackToIP().then(resolve);
        }

        async function fallbackToIP() {
            try {
                const res = await fetch('https://ipapi.co/json/');
                const data = await res.json();
                return data.city || data.region || 'New York';
            } catch (err) {
                console.error('IP lookup failed:', err);
                return 'New York';
            }
        }
    });
}
