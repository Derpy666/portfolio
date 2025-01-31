const categories = {
    foods: ["לחם", "פיצה", "סושי", "פלאפל", "שניצל", "מרק", "המבורגר", "קציצה", "קבב", "שווארמה", "חביתה", "ציפס", "טוסט"],
    animals: ["חמור", "פיל", "כלב", "חתול", "זברה", "חזיר", "פרה", "כבשה", "תרנגול", "גירפה", "קרנף", "אריה", "צבי", "אייל", "עז", "עכבר"],
    furnitures: ["שולחן", "כיסא", "מיט", "ספה", "ארון"],
    games: ["שחמט", "דמקה", "פוקר", "סנוקר", "כדורגל", "כדורסל", "פינג פונג", "טניס"]
};

let selectedCategory = "foods";
let selectedWord;
let guessedWord;
let lives = 6;
let usedLetters = [];

const wordElement = document.getElementById("word");
const messageElement = document.getElementById("message");
const hangmanImageElement = document.getElementById("hangman-image");
const restartButton = document.getElementById("restart-button");
const letterKeyboard = document.getElementById("letter-keyboard");
const categoryMenu = document.getElementById("category-menu");
const gameContent = document.getElementById("game-content");
const categorySelection = document.getElementById("category-selection");
const startButton = document.getElementById("start-button");

const finalLettersMap = {
    "נ": "ן",
    "כ": "ך",
    "מ": "ם",
    "פ": "ף",
    "צ": "ץ"
};

function normalizeLetter(letter) {
    return finalLettersMap[letter] || letter;
}

function normalizeWord(word) {
    return word.split("").map(normalizeLetter).join("");
}

function getRandomWord(category) {
    const words = categories[category];
    return words[Math.floor(Math.random() * words.length)];
}

function startNewGame() {
    selectedWord = getRandomWord(selectedCategory);
    guessedWord = Array(selectedWord.length).fill("_");
    lives = 6;
    usedLetters = [];
    messageElement.innerText = "נחש את המילה!";
    createKeyboard();
    updateDisplay();
    gameContent.style.display = "block";
    categorySelection.style.display = "block";
}

function updateDisplay() {
    wordElement.innerHTML = guessedWord
        .map(char => char === " " ? "&nbsp;" : char)
        .join(" ");
    hangmanImageElement.src = `./images/hangman${lives}.png`;
}

function createKeyboard() {
    letterKeyboard.innerHTML = "";
    const hebrewLetters = [
        "א", "ב", "ג", "ד", "ה", "ו", "ז", "ח",
        "ט", "י", "כ", "ל", "מ", "נ", "ס", "ע",
        "פ", "צ", "ק", "ר", "ש", "ת"
    ];
    hebrewLetters.forEach((letter) => {
        const button = document.createElement("button");
        button.innerText = letter;
        button.className = "letter-button";
        button.disabled = usedLetters.includes(letter);
        button.addEventListener("click", () => handleGuess(letter, button));
        letterKeyboard.appendChild(button);
    });
}

function handleGuess(guess, button) {
    const normalizedGuess = normalizeLetter(guess);

    if (usedLetters.includes(normalizedGuess)) return;

    usedLetters.push(normalizedGuess);
    button.disabled = true;

    const normalizedSelectedWord = normalizeWord(selectedWord);

    if (normalizedSelectedWord.includes(normalizedGuess)) {
        selectedWord.split("").forEach((char, index) => {
            if (normalizeLetter(char) === normalizedGuess) {
                guessedWord[index] = char;
            }
        });
        messageElement.innerText = "ניחוש טוב!";
    } else {
        lives--;
        messageElement.innerText = "ניחוש לא טוב!";
    }

    updateDisplay();

    if (lives <= 0) {
        messageElement.innerText = `המשחק נגמר! המילה הייתה: ${selectedWord}`;
        disableKeyboard();
    } else if (!guessedWord.includes("_")) {
        messageElement.innerText = "כל הכבוד! ניחשת את המילה!";
        disableKeyboard();
    }
}

function disableKeyboard() {
    letterKeyboard.querySelectorAll("button").forEach((btn) => (btn.disabled = true));
}

function restartGame() {
    selectedWord = getRandomWord(selectedCategory);
    guessedWord = selectedWord.split("").map(char => char === " " ? " " : "_");
    lives = 6;
    usedLetters = [];
    messageElement.innerText = "נחש את המילה!";
    createKeyboard();
    updateDisplay();

    console.log(selectedCategory);
    console.log(selectedWord);
}

categoryMenu.addEventListener("change", (e) => {
    selectedCategory = e.target.value;
    restartGame()
});

startNewGame();

restartButton.addEventListener("click", restartGame);
