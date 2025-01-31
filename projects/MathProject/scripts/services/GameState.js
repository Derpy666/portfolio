const GameState = {
    currentQuestionIndex: 0,
    points: 0,
    highScore: localStorage.getItem("mathGameHighScore") || 0,
    questions: [],
    difficulty: "normal",
    answers: [],
    
    reset() {
      this.currentQuestionIndex = 0;
      this.points = 0;
      this.answers = [];
      this.questions = [];
    },
  };

export { GameState }