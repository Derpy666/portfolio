import { checkForWinner } from "./winner.js";

let solution = [];

function createBoard(boardElement, puzzle, solvedPuzzle) {
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

export { solution, createBoard, handleCellInput }