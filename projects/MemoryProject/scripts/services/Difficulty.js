import { gameElements } from "./Elements.js"

const colors = { easy: "green", normal: "orange", hard: "red" }

const diff = gameElements.difficultySelect.addEventListener("change", function () {
    const difficulty = this.value;
    this.style.color = colors[difficulty]
  });
  
  gameElements.difficultySelect.dispatchEvent(new Event("change"));


export { diff }
