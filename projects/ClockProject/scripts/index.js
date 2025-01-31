import { cities } from "./services/cities.js";
import { createClock } from "./services/clock.js";
import { getTime } from "./services/time.js";

const clocks = cities.map(createClock);

setInterval(() => {
    clocks.forEach((clock, index) => {
        clock.innerText = getTime(cities[index].timezone);
    });
}, 1000);