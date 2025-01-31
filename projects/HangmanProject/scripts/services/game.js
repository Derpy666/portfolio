import { getRandomWord } from "./category.js";
import { updateDisplay, messageElement, disableKeyboard, createKeyboard, categorySelect } from "./dom.js";

let selectedCategory = "foods"
let selectedWord, guessedWord, lives, usedLetters;

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
    return word.split("" ).map(normalizeLetter).join("");
}

function startNewGame() {
    selectedWord = getRandomWord(selectedCategory);
    guessedWord = Array(selectedWord.length).fill("_");
    lives = 6;
    usedLetters = [];
    messageElement.innerText = "נחש את המילה!";
    createKeyboard();
    updateDisplay();
}

function handleGuess(guess) {
    const normalizedGuess = normalizeLetter(guess);
    if (usedLetters.includes(normalizedGuess)) return;
    
    usedLetters.push(normalizedGuess);
    const normalizedSelectedWord = normalizeWord(selectedWord);
    
    if (normalizedSelectedWord.includes(normalizedGuess)) {
        selectedWord.split("").forEach((char, index) => {
            if (normalizeLetter(char) === normalizedGuess) guessedWord[index] = char;
        });
        messageElement.innerText = "ניחוש טוב!";
    } else {
        messageElement.innerText = "ניחוש לא טוב!";
        lives--;
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

categorySelect.addEventListener("change", () => {
    selectedCategory = categorySelect.value
    startNewGame();
});

export { startNewGame, handleGuess, guessedWord, lives };