import { dom } from "./dom.js"
import { GameState } from "./GameState.js"
import { Question } from "./Question.js";

const GameService = {
    startGame() {
      GameState.difficulty = dom.difficultySelect.value;
      dom.hideElement(dom.startScreen);
      dom.showElement(dom.questionContainer);
      dom.hideElement(dom.gameTitle);
      
      dom.clearScoreTable();
      
      Question.generateQuestions(GameState.difficulty);
      GameState.answers = [];
      GameService.showQuestion();
    },
    
    showQuestion() {
      if (GameState.currentQuestionIndex < 10) {
        const currentQuestion = GameState.questions[GameState.currentQuestionIndex];
        dom.questionTitle.innerText = `שאלה ${GameState.currentQuestionIndex + 1} מתוך 10`;
        dom.questionElement.innerText = currentQuestion.question;
        dom.answerInput.value = "";
      } else {
        GameService.endGame();
      }
    },
    
    submitAnswer() {
      const userAnswer = parseFloat(dom.answerInput.value);
      if (!userAnswer) return;
      const currentQuestion = GameState.questions[GameState.currentQuestionIndex];
      const isCorrect = !isNaN(userAnswer) && Math.abs(userAnswer - currentQuestion.answer) < 0.01;
      
      if (isCorrect) GameState.points++;
      
      GameState.answers.push({
        questionNumber: GameState.currentQuestionIndex + 1,
        question: currentQuestion.question,
        userAnswer: userAnswer,
        correctAnswer: currentQuestion.answer,
        isCorrect: isCorrect,
      });
      
      GameState.currentQuestionIndex++;
      GameService.showQuestion();
    },
    
    endGame() {
        dom.hideElement(dom.questionContainer);
      dom.showElement(dom.endScreen);
      
      dom.finalScoreElement.innerText = GameState.points;
      if (GameState.points > GameState.highScore) {
        GameState.highScore = GameState.points;
        localStorage.setItem("mathGameHighScore", GameState.highScore);
      }
      dom.finalHighScoreElement.innerText = GameState.highScore;
      
      dom.clearScoreTable();
      
      GameState.answers.forEach((answer) => {
        const row = document.createElement("tr");
        row.classList.add(answer.isCorrect ? "correct" : "incorrect");
        row.innerHTML = `
          <td>${answer.questionNumber}</td>
          <td dir="ltr">${answer.question}</td>
          <td>${answer.userAnswer}</td>
          <td>${answer.correctAnswer}</td>
        `;
        dom.scoreTableBody.appendChild(row);
      });
    },
    
    restartGame() {
      GameState.reset();
      dom.clearScoreTable();
      
      dom.hideElement(dom.endScreen);
      dom.showElement(dom.startScreen);
      dom.showElement(dom.gameTitle);
      dom.updateHighScore(GameState.highScore);
    },
  };

export { GameService }