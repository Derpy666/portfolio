function showError(message) {
    const error = document.getElementById('error');
    error.innerText = message;
}

function clearError() {
    const error = document.getElementById('error');
    error.innerText = '';
}

function updateWeatherInfo(city, weatherData) {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = '';

    const cityElement = document.createElement('h2');
    cityElement.innerText = city;

    const tempElement = document.createElement('p');
    tempElement.innerText = `טמפרטורה: ${weatherData.temperature}°C`;

    const descElement = document.createElement('p');
    descElement.innerText = `מצב העננים: ${weatherData.description}`;

    const humidityElement = document.createElement('p');
    humidityElement.innerText = `לכות: ${weatherData.humidity}%`;

    const windElement = document.createElement('p');
    windElement.innerText = `מהירות הרוח: ${weatherData.windSpeed} קמ"ש`;

    const weatherImage = document.createElement('img');
    weatherImage.src = `https:${weatherData.icon}`;
    weatherImage.alt = weatherData.description;
    weatherImage.classList.add('weather-image');

    weatherInfo.appendChild(cityElement);
    weatherInfo.appendChild(tempElement);
    weatherInfo.appendChild(descElement);
    weatherInfo.appendChild(humidityElement);
    weatherInfo.appendChild(windElement);
    weatherInfo.appendChild(weatherImage);
}

function clearWeatherInfo() {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = '';
}

export { showError, clearError, updateWeatherInfo, clearWeatherInfo }
