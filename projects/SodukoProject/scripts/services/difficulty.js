const difficultySelect = document.getElementById("difficulty");
const colors = { easy: "green", normal: "orange", hard: "red" }

const diff = difficultySelect.addEventListener("change", function () {
    const difficulty = this.value;
    this.style.color = colors[difficulty]
  });
  
  difficultySelect.dispatchEvent(new Event("change"));


export { diff, difficultySelect }
