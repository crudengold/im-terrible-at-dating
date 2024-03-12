import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Quiz from './Quiz';
import { jsQuiz } from "./constants";

function App() {
  return <Quiz questions={ jsQuiz }/>;
}

export default App
