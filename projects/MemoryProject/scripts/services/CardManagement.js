import { gameElements } from "./Elements.js"
import { GameState } from "./GameState.js";
import { GameLogic } from "./GameLogic.js";

const Card = {
    getCardsByDifficulty(difficulty) {
        if (difficulty === "easy") {
            return gameElements.cardValues.slice(0, 4);
        } else if (difficulty === "hard") {
            return [...gameElements.cardValues, ...["🥥", "🍋"]];
        }
        return gameElements.cardValues;
    },

    createCards() {
        const difficulty = gameElements.difficultySelect.value;
        const selectedCards = Card.getCardsByDifficulty(difficulty);
        let cards = [...selectedCards, ...selectedCards].sort(() => 0.5 - Math.random());

        gameElements.grid.innerHTML = "";
        gameElements.grid.style.gridTemplateColumns = `repeat(${difficulty === "hard" ? 5 : 4}, 1fr)`;

        cards.forEach((value, index) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.setAttribute("data-value", value);
            card.setAttribute("data-index", index);
            card.addEventListener("click", GameLogic.flipCard);
            gameElements.grid.appendChild(card);
        });

        GameState.resetGameState();
        gameElements.message.innerText = "לחץ על קלף בשביל להתחיל!";
    }
}

export { Card }