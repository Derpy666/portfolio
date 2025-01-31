const gameElements = {
    grid: document.querySelector(".grid"),
    message: document.getElementById("message"),
    timerDisplay: document.getElementById("timer"),
    restartButton: document.getElementById("restart"),
    difficultySelect: document.getElementById("difficulty"),
    cardValues: ["🍎", "🍌", "🍇", "🍓", "🍍", "🥝", "🍒", "🍉"],
    highScoreKey: "memoryGameHighScore"
}

export { gameElements }