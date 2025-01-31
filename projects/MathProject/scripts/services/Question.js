import { GameState } from "./GameState.js";

const Question = {
    generateQuestions(difficulty) {
      const operators = ["+", "-", "*", "/"];
      const maxValues = { easy: 10, normal: 20, hard: 50 };
      const max = maxValues[difficulty];
      
      GameState.questions = [];
      
      for (let i = 0; i < 10; i++) {
        let rndNum1 = Math.ceil(Math.random() * max);
        let rndNum2 = Math.ceil(Math.random() * max);
        let operator = operators[Math.floor(Math.random() * operators.length)];
        let question, answer;
  
        if (operator === "/") {
          answer = Math.ceil(Math.random() * max);
          rndNum2 = Math.ceil(Math.random() * (max / 2)) || 1;
          let dividend = answer * rndNum2;
          question = `${dividend} / ${rndNum2}`;
        } else if (operator === "-") {
          if (rndNum1 < rndNum2) [rndNum1, rndNum2] = [rndNum2, rndNum1];
          question = `${rndNum1} - ${rndNum2}`;
          answer = rndNum1 - rndNum2;
        } else {
          question = `${rndNum1} ${operator} ${rndNum2}`;
          answer = eval(question);
        }
  
        GameState.questions.push({ question, answer });
      }
    },
  };

  export { Question }