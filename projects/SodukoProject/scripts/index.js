import { data } from "./sodukoCards.js";

const boardElement = document.getElementById("sudoku-board");
const timerElement = document.getElementById("timer");
const restartButton = document.getElementById("restart");
const difficultySelect = document.getElementById("difficulty");
const message = document.getElementById("message");

let timerInterval;
let secondsElapsed = 0;
let solution = [];

function createBoard(puzzle, solvedPuzzle) {
  boardElement.innerHTML = "";
  solution = solvedPuzzle;

  puzzle.forEach((row, rowIndex) => {
    row.forEach((value, colIndex) => {
      const cell = document.createElement("input");
      cell.type = "text";
      cell.dataset.row = rowIndex;
      cell.dataset.col = colIndex;

      cell.addEventListener("input", (event) => handleCellInput(event, rowIndex, colIndex));

      cell.classList.add("cell");
      if (value) {
        cell.value = value;
        cell.classList.add("read-only");
        cell.disabled = true;
      }
      boardElement.appendChild(cell);
    });
  });
}

function handleCellInput(event, row, col) {
  const cell = event.target;
  const value = cell.value.trim();

  cell.removeAttribute("correct");
  cell.style.color = "";

  if (isNaN(value) || value < 1 || value > 9 || value.length > 1) {
    cell.value = "";
    return;
  }

  const typedValue = parseInt(value, 10);

  if (typedValue === solution[row][col]) {
    cell.setAttribute("correct", "true");
    cell.style.color = "lime";
    checkForWinner();
  } else {
    cell.setAttribute("correct", "false");
    cell.style.color = "red";
  }
}

function checkForWinner() {
  const cells = document.querySelectorAll(".cell");
  const allCorrect = Array.from(cells).every(
    (cell) => cell.getAttribute("correct") === "true" || cell.disabled
  );

  if (allCorrect) {
    message.innerText = `כל הכבוד, פתרת את הסודוקו במשך: ${formatTime(secondsElapsed)}`;
    clearInterval(timerInterval);
  }
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

function startTimer() {
  secondsElapsed = 0;
  timerElement.innerText = "משך זמן: 0:00";
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    secondsElapsed++;
    timerElement.innerText = `משך זמן: ${formatTime(secondsElapsed)}`;
  }, 1000);
}

function startGame() {
  const difficulty = difficultySelect.value;
  const puzzles = data[difficulty];
  const rndNum = Math.floor(Math.random() * puzzles.length);
  const { value, solution: solvedPuzzle } = puzzles[rndNum];
  createBoard(value, solvedPuzzle);
  startTimer();
}

restartButton.addEventListener("click", startGame);

difficultySelect.addEventListener("change", startGame);
difficultySelect.dispatchEvent(new Event("change"));


document.getElementById("difficulty").addEventListener("change", function () {
    const difficulty = this.value;
    this.style.color =
        difficulty === "easy"
            ? "green"
            : difficulty === "normal"
                ? "orange"
                : difficulty === "hard"
                    ? "red"
                    : "initial";
});

document.getElementById("difficulty").dispatchEvent(new Event("change"));
