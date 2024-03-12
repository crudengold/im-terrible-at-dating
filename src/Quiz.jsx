/* eslint-disable react/prop-types */

import { useState } from 'react';
import { resultInitialState } from './constants';

const Quiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // const [answerIndex, setAnswerIndex] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState(resultInitialState);
  const [showResult, setShowResult] = useState(false);
  const [yearGuess, setYearGuess] = useState('')

  const { question, correctAnswer } = questions[currentQuestion]

  const onAnswerClick = (answer, index) => {
    // setAnswerIndex(index);
    if(answer === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  };

  const calculateDifference = (yearGuess, correctAnswer) => {
    return Math.abs(yearGuess - correctAnswer);
  }

  const onClickNext = () => {
    console.log(yearGuess);
    console.log(correctAnswer)
    console.log(calculateDifference(yearGuess, correctAnswer))
    // setAnswerIndex(null);
    onAnswerClick(yearGuess, 0);
    setResult((prev) =>
      answer
       ? {
          ...prev,
          score: prev.score + calculateDifference(yearGuess, correctAnswer),
          bangOnAnswers: prev.bangOnAnswers + 1,
       } : {
          ...prev,
          score: prev.score + calculateDifference(yearGuess, correctAnswer),
       }
    );
    setYearGuess('');

    if(currentQuestion !== questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setCurrentQuestion(0);
      setShowResult(true);
    }
  };

  const onTryAgain = () => {
    setResult(resultInitialState);
    setShowResult(false)
  };

  const handleInputChange = (e) => { // Add this function to handle input changes
    setYearGuess(e.target.value);
  }

  return (
    <div className="quiz-container">
      {!showResult ? (<>
        <span className="when-question">What year did this happen?</span>
        <h2>{question}</h2>
        <input
          className="year-guess"
          placeholder="Guess a year..."
          value={yearGuess}
          onChange={handleInputChange}
          />
        {/* <ul>
          {
            choices.map((answer, index) => (
              <li
                onClick={() => onAnswerClick(answer, index)}
                key={answer}
                className={answerIndex === index ? "selected-answer" : null}
                >
                  {answer}
              </li>
            ))}
        </ul> */}
        <div className="footer">
              <button onClick={onClickNext}>
                {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
              </button>
        </div>
      </>) : <div className="result">
        <h3>Result</h3>
        <p>
          Total Score: <span>{result.score}</span>
        </p>
        <p>
          Bang On Answers: <span>{result.bangOnAnswers}</span>
        </p>
        <button onClick={onTryAgain}>Try again</button>
        </div>}

    </div>
  );
};

export default Quiz;
