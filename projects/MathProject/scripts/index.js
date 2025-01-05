const gameTitle = document.getElementById("game-title");
const startScreen = document.getElementById("start-screen");
const questionContainer = document.getElementById("question-container");
const endScreen = document.getElementById("end-screen");
const questionTitle = document.getElementById("question-title");
const questionElement = document.getElementById("question");
const finalScoreElement = document.getElementById("final-score");
const finalHighScoreElement = document.getElementById("final-high-score");
const highScoreElement = document.getElementById("high-score");
const answerInput = document.getElementById("answer");
const difficultySelect = document.getElementById("difficulty");
const scoreTableBody = document.querySelector("#score-table tbody");

let currentQuestionIndex = 0;
let points = 0;
let highScore = localStorage.getItem("mathGameHighScore") || 0;
let questions = [];
let difficulty = "normal";
let answers = [];

highScoreElement.innerText = highScore;

function startGame() {
  difficulty = difficultySelect.value;
  startScreen.style.display = "none";
  questionContainer.style.display = "block";
  gameTitle.style.display = "none";
  
  scoreTableBody.innerHTML = ''

  generateQuestions();
  showQuestion();
  answers = [];
}

function showQuestion() {
  if (currentQuestionIndex < 10) {
    const currentQuestion = questions[currentQuestionIndex];
    questionTitle.innerText = `שאלה ${currentQuestionIndex + 1} מתוך 10`;
    questionElement.innerText = `${currentQuestion.question} = `;
    answerInput.value = "";
  } else {
    endGame();
  }
}

function submitAnswer() {
  const userAnswer = parseFloat(answerInput.value);
  if (!userAnswer) return;
  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect =
    !isNaN(userAnswer) && Math.abs(userAnswer - currentQuestion.answer) < 0.01;

  if (isCorrect) {
    points++;
  }

  answers.push({
    questionNumber: currentQuestionIndex + 1,
    question: currentQuestion.question,
    userAnswer: userAnswer,
    correctAnswer: currentQuestion.answer,
    isCorrect: isCorrect,
  });

  currentQuestionIndex++;
  showQuestion();
}

function endGame() {
  questionContainer.style.display = "none";
  endScreen.style.display = "block";

  finalScoreElement.innerText = points;
  if (points > highScore) {
    highScore = points;
    localStorage.setItem("mathGameHighScore", highScore);
  }
  finalHighScoreElement.innerText = highScore;
  
  scoreTableBody.innerHTML = ''

  answers.forEach((answer) => {
    const row = document.createElement("tr");
    row.classList.add(answer.isCorrect ? "correct" : "incorrect");

    row.innerHTML = `
      <td>${answer.questionNumber}</td>
      <td>${answer.question}</td>
      <td>${answer.userAnswer}</td>
      <td>${answer.correctAnswer}</td>
    `;
    scoreTableBody.appendChild(row);
  });
}

function restartGame() {
  currentQuestionIndex = 0;
  points = 0;
  answers = [];
  questions = [];
  
  scoreTableBody.innerHTML = ''

  endScreen.style.display = "none";
  startScreen.style.display = "block";
  gameTitle.style.display = "block";
  highScoreElement.innerText = highScore;
}

function generateQuestions() {
  const operators = ["+", "-", "*", "/"];
  const maxValues = {
    easy: 10,
    normal: 20,
    hard: 50,
  };

  const max = maxValues[difficulty];

  for (let i = 0; i < 10; i++) {
    const rndNum1 = Math.ceil(Math.random() * max);
    const rndNum2 = Math.ceil(Math.random() * max);
    const operator = operators[Math.floor(Math.random() * operators.length)];
    let question, answer;

    if (operator === "/") {
      const dividend = rndNum1 * rndNum2;
      question = `${dividend} / ${rndNum2}`;
      answer = dividend / rndNum2;
    } else {
      question = `${rndNum1} ${operator} ${rndNum2}`;
      answer = eval(question);
    }

    questions.push({ question, answer: parseFloat(answer.toFixed(2)) });
  }
}

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