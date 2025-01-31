class GameStateService {
    constructor() {
        this.firstCard = null;
        this.secondCard = null;
        this.isChecking = false;
        this.matchedPairs = 0;
        this.startTime = null;
        this.timerInterval = null;
        this.elapsedTime = 0;
    }

    resetGameState() {
        this.firstCard = null;
        this.secondCard = null;
        this.isChecking = false;
        this.matchedPairs = 0;
        this.startTime = null;
        this.elapsedTime = 0;
        clearInterval(this.timerInterval);
        this.timerInterval = null;
    }
}

const GameState = new GameStateService();

export { GameState }
