let timerInterval;
let secondsElapsed = 0;

function startTimer(timerElement) {
  secondsElapsed = 0;
  timerElement.innerText = "משך זמן: 0:00";
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    secondsElapsed++;
    timerElement.innerText = `משך זמן: ${formatTime(secondsElapsed)}`;
  }, 1000);
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

function stopTimer() {
  clearInterval(timerInterval);
}

export { timerInterval, secondsElapsed, startTimer, formatTime, stopTimer }