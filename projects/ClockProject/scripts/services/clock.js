import { getTime } from "./time.js";

function createClock(city) {
    const clock = document.createElement("div");
    clock.className = "clock";
    clock.style.backgroundImage = `url(${city.background})`;

    const cityName = document.createElement("div");
    cityName.className = "city";
    cityName.innerText = city.name;

    const time = document.createElement("div");
    time.className = "time";
    time.innerText = getTime(city.timezone);

    clock.appendChild(cityName);
    clock.appendChild(time);
    document.body.appendChild(clock);

    return time;
}

export { createClock }