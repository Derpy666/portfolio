import { stopTimer, secondsElapsed, formatTime } from "./timer.js";

function checkForWinner() {
  const cells = document.querySelectorAll(".cell");
  const allCorrect = Array.from(cells).every(
    (cell) => cell.getAttribute("correct") === "true" || cell.disabled
  );

  if (allCorrect) {
    document.getElementById("message").innerText = `כל הכבוד, פתרת את הסודוקו במשך: ${formatTime(secondsElapsed)}`;
    stopTimer();
  }
}

export { checkForWinner }