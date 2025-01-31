import { showError } from "./dom.js";

async function fetchWeather(city) {
    const apiKey = 'ef41b97a4f6249d8a3c151826242512';
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=no`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if(data.error) {
            if(data.error.code == 1002) {
                showError("בעיה באתר, אנא נסו שוב מאוחר יותר")
                throw Error("Invaild API Key")
            }
            if(data.error.code == 1006) {
                showError("העיר לא נמצאה, נסה להוסיף את המדינה אחרי העיר")
                throw Error("Location Not Found")
            }
        }

        return {
            temperature: data.current.temp_c,
            description: data.current.condition.text,
            humidity: data.current.humidity,
            windSpeed: data.current.wind_kph,
            icon: data.current.condition.icon,
        };
    } catch (err) {
        console.error(err)
        return { error: err }
    }
}


export { fetchWeather }
