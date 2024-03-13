/* eslint-disable react/prop-types */

import { useState } from 'react';
import { resultInitialState } from '../../constants';
import "./Quiz.scss";
import AnswerTimer from '../AnswerTimer/AnswerTimer';

const Quiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // const [answerIndex, setAnswerIndex] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState(resultInitialState);
  const [showResult, setShowResult] = useState(false);
  const [yearGuess, setYearGuess] = useState('')
  const [showAnswer, setShowAnswer] = useState(false);
  const [showTimer, setShowTimer] = useState(true);

  const { question, correctAnswer } = questions[currentQuestion]

  const onAnswerClick = (answer) => {
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

  const onClickGuess = (finalAnswer) => {
    onAnswerClick(yearGuess);
    setShowAnswer(true);
    setResult((prev) =>
      finalAnswer
       ? {
          ...prev,
          score: prev.score + calculateDifference(yearGuess, correctAnswer),
          bangOnAnswers: prev.bangOnAnswers + 1,
       } : {
          ...prev,
          score: prev.score + calculateDifference(yearGuess, correctAnswer),
       }
    );
  }

  const onClickNext = () => {
    // setAnswerIndex(null);
    setShowAnswer(false);
    setYearGuess('');
    setShowTimer(false);
    if(currentQuestion !== questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      console.log(result)
    } else {
      setCurrentQuestion(0);
      setShowResult(true);
    }
    setTimeout(() => {
      setShowTimer(true);
    });
  };

  const onTryAgain = () => {
    setResult(resultInitialState);
    setShowResult(false)
  };

  const handleInputChange = (e) => {
    setYearGuess(e.target.value);
  }

  const handleTimeUp = () => {
    setAnswer(false);
    setShowAnswer(true);
    onClickGuess(false);
  };

  return (
    <div className="quiz-container">
      {!showResult ? (<>
        {showTimer && <AnswerTimer duration={10} onTimeUp={handleTimeUp}/>}
        <span className="when-question">What year did this happen?</span>
        <h2>{question}</h2>
        <input
          className="year-guess"
          placeholder="Guess a year..."
          value={yearGuess}
          onChange={handleInputChange}
          disabled={showAnswer}
          />
        {showAnswer && (
        <div>
          <p>Correct answer: {correctAnswer}</p>
          <p>Your score: {result.score}</p>
        </div>
        )}
        <div className="footer">
          <button onClick={() => onClickGuess(answer)} style={{display: !showAnswer ? "" : "none"}}>
            Guess
          </button>
          <button onClick={onClickNext} style={{display: showAnswer ? "" : "none"}}>
            Next
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
