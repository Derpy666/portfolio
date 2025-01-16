const grid = document.querySelector(".grid");
const message = document.getElementById("message");
const timerDisplay = document.getElementById("timer");
const restartButton = document.getElementById("restart");
const difficultySelect = document.getElementById("difficulty");

const cardValues = ["🍎", "🍌", "🍇", "🍓", "🍍", "🥝", "🍒", "🍉"];

let firstCard = null;
let secondCard = null;
let isChecking = false;
let matchedPairs = 0;

let startTime = null;
let timerInterval = null;
let highScoreKey = "memoryGameHighScore";

let elapsedTime;

function getCardsByDifficulty(difficulty) {
    if (difficulty === "easy") {
        return cardValues.slice(0, 4);
    } else if (difficulty === "hard") {
        return [...cardValues, ...["🥥", "🍋"]];
    }
    return cardValues;
}

function createCards() {
    const difficulty = difficultySelect.value;
    const selectedCards = getCardsByDifficulty(difficulty);
    let cards = [...selectedCards, ...selectedCards];
    cards = cards.sort(() => 0.5 - Math.random());

    grid.innerHTML = "";
    grid.style.gridTemplateColumns = `repeat(${difficulty === "hard" ? 5 : 4
        }, 1fr)`;

    cards.forEach((value, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("data-value", value);
        card.setAttribute("data-index", index);
        card.addEventListener("click", flipCard);
        grid.appendChild(card);
    });

    resetGame();
}

function flipCard() {
    if (isChecking) return;

    const card = this;

    if (card.classList.contains("flipped") || card.classList.contains("matched"))
        return;

    if (!startTime) {
        startTime = Date.now();
        timerInterval = setInterval(updateTimer, 100);
    }

    card.classList.add("flipped");
    card.textContent = card.getAttribute("data-value");

    if (!firstCard) {
        firstCard = card;
    } else if (!secondCard) {
        secondCard = card;
        checkMatch();
    }
}

function checkMatch() {
    isChecking = true;

    const firstValue = firstCard.getAttribute("data-value");
    const secondValue = secondCard.getAttribute("data-value");

    if (firstValue === secondValue) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        matchedPairs++;

        if (matchedPairs === document.querySelectorAll(".card").length / 2) {
            endGame();
        } else {
            message.textContent = "התאמה נמצאה!";
        }

        resetSelection();
    } else {
        message.textContent = "אין התאמה, אנא נסה שוב!";
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            firstCard.textContent = "";
            secondCard.textContent = "";
            resetSelection();
        }, 1000);
    }
}

function resetSelection() {
    firstCard = null;
    secondCard = null;
    isChecking = false;
}

function resetGame() {
    firstCard = null;
    secondCard = null;
    isChecking = false;
    matchedPairs = 0;
    startTime = null;
    timerDisplay.textContent = "";
    clearInterval(timerInterval);
    elapsedTime = 0
    message.textContent = "לחץ על קלף בשביל להתחיל!";
}

function updateTimer() {
    if (startTime) {
        elapsedTime = (Date.now() - startTime) / 1000;
        timerDisplay.textContent = `${elapsedTime.toFixed(2)} שניות`;
    }
}

function endGame() {
    clearInterval(timerInterval);

    const highScore = parseFloat(localStorage.getItem(highScoreKey)) || 0;

    let msg = `
    אתה ניצחת!
    <br>
    לקח לך ${elapsedTime.toFixed(2)} שניות!
    `

    if (highScore == 0 || elapsedTime < highScore) {
        localStorage.setItem(highScoreKey, elapsedTime);
        msg += `
        <br>
        הושג שיא חדש!
        `
    } else {
        msg += `
        <br>
        השיא שלך הוא: ${highScore.toFixed(2)} שניות!
        `
    }
        
        message.innerHTML = msg
}

restartButton.addEventListener("click", createCards);
difficultySelect.addEventListener("change", createCards);

createCards();

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
