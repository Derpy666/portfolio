import { data } from "./sodukoCards.js";

const boardElement = document.getElementById("sudoku-board");
const timerElement = document.getElementById("timer");
const validateButton = document.getElementById("validate");
const restartButton = document.getElementById("restart");
const difficultySelect = document.getElementById("difficulty");
const message = document.getElementById("message");

let timerInterval;
let secondsElapsed = 0;

const difficulty = difficultySelect.value



function createBoard(puzzle) {
  boardElement.innerHTML = "";
  puzzle.forEach((row, rowIndex) => {
    row.forEach((value, colIndex) => {
        const cell = document.createElement("input");
        cell.type = "text";

        cell.addEventListener("input", (event) => {
            const value = cell.value;
            if(isNaN(value)) {
                cell.value = ""
            }

            if(parseInt(value) < 1) {
                cell.value = ""
            }

            if(parseInt(value) > 9) {
                cell.value = ""
            }
            
            if(value.length > 1) {
                cell.value = ""
            }
        });

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

function validateBoard() {
    const cells = document.querySelectorAll(".cell");
    const userBoard = Array.from({ length: 9 }, () => Array(9).fill(0));
    let isComplete = true;
  
    cells.forEach((cell, index) => {
      const rowIndex = Math.floor(index / 9); 
      const colIndex = index % 9; 
  
      const value = parseInt(cell.value, 10);
      if (value && value >= 1 && value <= 9) {
        userBoard[rowIndex][colIndex] = value;
      } else {
        isComplete = false;
      }
    });
  
    if (!isComplete) {
      message.innerText = "הלוח לא מלא, אנא מלא אותו קודם";
      return;
    }
  
    if (isBoardValid(userBoard)) {
      message.innerText = `כל הכבוד, פתרת את הסודוקו במשך: ${formatTime(secondsElapsed)}`;
      clearInterval(timerInterval);
    } else {
      message.innerText = "הפיתרון לא טוב, אמשך לנסות!";
    }
  }

function isBoardValid(board) {
  for (let i = 0; i < 9; i++) {
    const rowSet = new Set();
    const colSet = new Set();
    for (let j = 0; j < 9; j++) {
      if (board[i][j]) {
        if (rowSet.has(board[i][j])) return false;
        rowSet.add(board[i][j]);
      }
      if (board[j][i]) {
        if (colSet.has(board[j][i])) return false;
        colSet.add(board[j][i]);
      }
    }
  }

  for (let row = 0; row < 9; row += 3) {
    for (let col = 0; col < 9; col += 3) {
      const gridSet = new Set();
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const value = board[row + i][col + j];
          if (value) {
            if (gridSet.has(value)) return false;
            gridSet.add(value);
          }
        }
      }
    }
  }

  return true;
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

function startTimer() {
  secondsElapsed = 0;
  timerElement.textContent = "משך זמן: 0:00";
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    secondsElapsed++;
    timerElement.textContent = `משך זמן: ${formatTime(secondsElapsed)}`;
  }, 1000);
}

function startGame() {
    let rndNum = Math.ceil(Math.random() * data[difficulty].length) - 1;
    console.log(rndNum)
    console.log(difficulty)
    console.log(data[difficulty][rndNum])
    createBoard(data[difficulty][rndNum]);
    startTimer();
}

window.addEventListener("keypress", function() {
    message.innerText = ""
})

restartButton.addEventListener("click", startGame);

validateButton.addEventListener("click", validateBoard);

difficultySelect.addEventListener("change", startGame);

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
