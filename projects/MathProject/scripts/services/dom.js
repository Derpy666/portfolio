import { GameService } from "./GameLogic.js";

const dom = {
    gameTitle: document.getElementById("game-title"),
    startScreen: document.getElementById("start-screen"),
    questionContainer: document.getElementById("question-container"),
    endScreen: document.getElementById("end-screen"),
    questionTitle: document.getElementById("question-title"),
    questionElement: document.getElementById("question"),
    finalScoreElement: document.getElementById("final-score"),
    finalHighScoreElement: document.getElementById("final-high-score"),
    highScoreElement: document.getElementById("high-score"),
    answerInput: document.getElementById("answer"),
    difficultySelect: document.getElementById("difficulty"),
    scoreTableBody: document.querySelector("#score-table tbody"),
    startGame: document.getElementById("startGame"),
    submitAnswer: document.getElementById("submitAnswer"),
    restartGame: document.getElementById("restartGame"),
    
    updateHighScore(highScore) {
      this.highScoreElement.innerText = highScore;
    },
    clearScoreTable() {
      this.scoreTableBody.innerHTML = '';
    },
    showElement(element) {
      element.style.display = "block";
    },
    hideElement(element) {
      element.style.display = "none";
    },
  };

dom.startGame.addEventListener("click", GameService.startGame)
dom.submitAnswer.addEventListener("click", GameService.submitAnswer)
dom.restartGame.addEventListener("click", GameService.restartGame)

export { dom }