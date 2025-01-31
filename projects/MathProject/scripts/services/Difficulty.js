import { dom } from "./dom.js"

const colors = { easy: "green", normal: "orange", hard: "red" }

const diff = dom.difficultySelect.addEventListener("change", function () {
    const difficulty = this.value;
    this.style.color = colors[difficulty]
  });
  
  dom.difficultySelect.dispatchEvent(new Event("change"));


export { diff }
