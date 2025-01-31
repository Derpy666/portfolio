import { data } from "./sodukoCards.js";
import { createBoard } from "./board.js";
import { startTimer } from "./timer.js";

function startGame(boardElement, timerElement, difficultySelect) {
  const difficulty = difficultySelect.value;
  const puzzles = data[difficulty];
  const rndNum = Math.floor(Math.random() * puzzles.length);
  const { value, solution } = puzzles[rndNum];
  createBoard(boardElement, value, solution);
  startTimer(timerElement);
}

export { startGame }