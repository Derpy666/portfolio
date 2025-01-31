import { Card } from "./services/CardManagement.js"
import { diff } from "./services/Difficulty.js"
import { gameElements } from "./services/Elements.js"
import { GameLogic } from "./services/GameLogic.js"
import { GameState } from "./services/GameState.js"
import { GameTimer } from "./services/Timer.js"

gameElements.restartButton.addEventListener("click", () => {
    Card.createCards();
    gameElements.timerDisplay.innerText = ""
});
gameElements.difficultySelect.addEventListener("change", Card.createCards);

Card.createCards();
