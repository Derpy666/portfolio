import { GameState } from "./GameState.js"
import { GameTimer } from "./Timer.js"
import { gameElements } from "./Elements.js";

const GameLogic = {
    flipCard() {
        if (GameState.isChecking) return;

        const card = this;
        if (card.classList.contains("flipped") || card.classList.contains("matched")) return;

        if (!GameState.startTime) {
            GameState.startTime = Date.now();
            GameState.timerInterval = setInterval(GameTimer.updateTimer, 100);
        }

        gameElements.message.innerText = "...";
        card.classList.add("flipped");
        card.innerText = card.getAttribute("data-value");

        if (!GameState.firstCard) {
            GameState.firstCard = card;
        } else {
            GameState.secondCard = card;
            GameLogic.checkMatch();
        }
    },

    checkMatch() {
        GameState.isChecking = true;

        const firstValue = GameState.firstCard.getAttribute("data-value");
        const secondValue = GameState.secondCard.getAttribute("data-value");

        if (firstValue === secondValue) {
            GameState.firstCard.classList.add("matched");
            GameState.secondCard.classList.add("matched");
            GameState.matchedPairs++;

            if (GameState.matchedPairs === document.querySelectorAll(".card").length / 2) {
                GameTimer.endGame();
            } else {
                gameElements.message.innerText = "התאמה נמצאה!";
            }

            GameLogic.resetSelection();
        } else {
            gameElements.message.innerText = "אין התאמה, נסה שוב!";
            setTimeout(() => {
                GameState.firstCard.classList.remove("flipped");
                GameState.secondCard.classList.remove("flipped");
                GameState.firstCard.innerText = "";
                GameState.secondCard.innerText = "";
                GameLogic.resetSelection();
            }, 1000);
        }
    },

    resetSelection() {
        GameState.firstCard = null;
        GameState.secondCard = null;
        GameState.isChecking = false;
    }
}

export { GameLogic }