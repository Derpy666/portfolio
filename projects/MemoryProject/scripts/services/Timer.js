import { gameElements } from "./Elements.js"
import { GameState } from "./GameState.js";

const GameTimer = {
    updateTimer() {
        if (GameState.startTime) {
            GameState.elapsedTime = (Date.now() - GameState.startTime) / 1000;
            gameElements.timerDisplay.innerText = `${GameState.elapsedTime.toFixed(2)} שניות`;
        }
    },

    endGame() {
        clearInterval(GameState.timerInterval);

        const highScore = parseFloat(localStorage.getItem(gameElements.highScoreKey)) || 0;
        let msg = `אתה ניצחת!<br>לקח לך ${GameState.elapsedTime.toFixed(2)} שניות!`;

        if (highScore === 0 || GameState.elapsedTime < highScore) {
            localStorage.setItem(gameElements.highScoreKey, GameState.elapsedTime);
            msg += `<br>הושג שיא חדש!`;
        } else {
            msg += `<br>השיא שלך הוא: ${highScore.toFixed(2)} שניות!`;
        }

        gameElements.message.innerHTML = msg;
    }
}

export { GameTimer }