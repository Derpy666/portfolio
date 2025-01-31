import { showError, clearError, updateWeatherInfo, clearWeatherInfo } from './services/dom.js';
import { fetchWeather } from './services/api.js';

const weather = document.getElementById('getWeather')
const city = document.getElementById('city')

weather.addEventListener('click', async () => {
    if (!city.value) {
        showError("תרשום שם של עיר");
        return;
    }

        clearError();
        const weatherData = await fetchWeather(city.value);
        if(!weatherData.error) {
            updateWeatherInfo(city.value, weatherData);
        }
});

city.addEventListener("input", (event) => {
    clearError();
    const regex = /^[a-zA-Z\s]+$/;
    if (event.target.value && !regex.test(event.target.value)) {
        showError("אתה יכול לרשום רק עיר באנגלית");
    }
});
