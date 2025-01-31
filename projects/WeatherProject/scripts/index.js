const button = document.getElementById('getWeather');
const cityInput = document.getElementById('city');
const weatherInfo = document.getElementById('weatherInfo');
const error = document.getElementById('error');

button.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        getWeather(city);
    } else {
        error.innerText = "תרשום שם של עיר";
    }
});

cityInput.addEventListener("input", (event) => {
    error.innerText = ""
    const regex = RegExp("[a-zA-Z]")
    if(cityInput.value != "") {
        if(!regex.test(cityInput.value)) {
            error.innerText = "אתה יכול לרשום רק עיר באנגלית"
        }
    }
})

async function getWeather(city) {
    const apiKey = 'ef41b97a4f6249d8a3c151826242512'; 
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=no`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            error.innerText = "העיר לא נמצאה, נסה להוסיף את המדינה אחרי העיר";
            weatherInfo.innerHTML = '';
        } else {
            const temperature = data.current.temp_c;
            const description = data.current.condition.text;
            const humidity = data.current.humidity;
            const windSpeed = data.current.wind_kph;

            weatherInfo.innerHTML = '';

            const cityElement = document.createElement('h2');
            cityElement.innerText = city;

            const tempElement = document.createElement('p');
            tempElement.innerText = `טמפרטורה: ${temperature}°C`;

            const descElement = document.createElement('p');
            descElement.innerText = `מצב העננים: ${description}`;

            const humidityElement = document.createElement('p');
            humidityElement.innerText = `לכות: ${humidity}%`;

            const windElement = document.createElement('p');
            windElement.innerText = `מהירות הרוח: ${windSpeed} קמ"ש`;

            const weatherImage = document.createElement('img');
            weatherImage.src = `https:${data.current.condition.icon}`;
            weatherImage.alt = description;
            weatherImage.classList.add('weather-image');

            weatherInfo.appendChild(cityElement);
            weatherInfo.appendChild(tempElement);
            weatherInfo.appendChild(descElement);
            weatherInfo.appendChild(humidityElement);
            weatherInfo.appendChild(windElement);
            weatherInfo.appendChild(weatherImage);

            error.innerText = '';
        }
    } catch (err) {
        error.innerText = "בעיה באתר, אנא נסו שוב מאוחר יותר";
        console.error("An error occurred. Please try again later.", err)
        weatherInfo.innerHTML = '';
    }
}