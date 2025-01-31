import { handleGuess, guessedWord, lives } from "./game.js";

const wordElement = document.getElementById("word");
const messageElement = document.getElementById("message");
const hangmanImageElement = document.getElementById("hangman-image");
const letterKeyboard = document.getElementById("letter-keyboard");
const restartButton = document.getElementById("restart-button");
const categorySelect = document.getElementById("category-menu");

function updateDisplay() {
    wordElement.innerHTML = guessedWord.map(char => char === " " ? "&nbsp;" : char).join(" ");
    hangmanImageElement.src = `./images/hangman${lives}.png`;
}

function createKeyboard() {
    letterKeyboard.innerHTML = "";
    ["א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", "י", "כ", "ל", "מ", "נ", "ס", "ע", "פ", "צ", "ק", "ר", "ש", "ת"].forEach(letter => {
        const button = document.createElement("button");
        button.innerText = letter;
        button.className = "letter-button";
        button.addEventListener("click", () => {
            button.disabled = true
            handleGuess(letter)
    });
        letterKeyboard.appendChild(button);
    });
}

function disableKeyboard() {
    letterKeyboard.querySelectorAll("button").forEach((btn) => (btn.disabled = true));
}

export { restartButton, updateDisplay, createKeyboard, messageElement, disableKeyboard, categorySelect }