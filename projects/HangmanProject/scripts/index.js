import { startNewGame } from "./services/game.js";
import { createKeyboard, restartButton } from "./services/dom.js";

createKeyboard();
restartButton.addEventListener("click", startNewGame);
startNewGame();