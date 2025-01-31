import { startGame } from "./services/game.js";
import { difficultySelect } from "./services/difficulty.js";

const boardElement = document.getElementById("sudoku-board");
const timerElement = document.getElementById("timer");
const restartButton = document.getElementById("restart");

difficultySelect.addEventListener("change", () => startGame(boardElement, timerElement, difficultySelect));
restartButton.addEventListener("click", () => startGame(boardElement, timerElement, difficultySelect));
difficultySelect.dispatchEvent(new Event("change"));