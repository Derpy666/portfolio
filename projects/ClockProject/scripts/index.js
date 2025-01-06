const cities = [
    { 
        name: "ניו יורק", 
        timezone: "America/New_York", 
        background: "./images/new-york.png" 
    },
    { 
        name: "לונדון", 
        timezone: "Europe/London", 
        background: "./images/london.png" 
    },
    { 
        name: "טוקיו", 
        timezone: "Asia/Tokyo", 
        background: "./images/tokyo.png" 
    },
    { 
        name: "ירושלים", 
        timezone: "Asia/Jerusalem", 
        background: "./images/jerusalem.png" 
    }
];

function createClock(city) {
    const clock = document.createElement("div");
    clock.className = "clock";
    clock.style.backgroundImage = `url(${city.background})`;

    const cityName = document.createElement("div");
    cityName.className = "city";
    cityName.textContent = city.name;

    const time = document.createElement("div");
    time.className = "time";
    time.textContent = getTime(city.timezone);

    clock.appendChild(cityName);
    clock.appendChild(time);
    document.body.appendChild(clock);

    return time;
}

function getTime(timezone) {
    const options = { timeZone: timezone, hour: "2-digit", minute: "2-digit", second: "2-digit" };
    return new Intl.DateTimeFormat("he-IL", options).format(new Date());
}

const clocks = cities.map(createClock);

setInterval(() => {
    clocks.forEach((clock, index) => {
        clock.textContent = getTime(cities[index].timezone);
    });
}, 1000);