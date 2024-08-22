import React, { useEffect, useState } from 'react'
import Levels from '../Levels/Levels'
import { QuizMarvel } from '../QuizMarvel/index.js'
import ProgressBar from '../ProgressBar/ProgressBar'

const MAX_QUESTIONS = 10;

export default function Quiz() {
  const quiz = QuizMarvel[0].quizz
  const levelNames = ["debutant", "confirme", "expert"]
  const [quizLevel, setQuizLevel] = useState(0)
  const [question, setQuestion] = useState(0)
  const [options, setOptions] = useState([])
  const [answer, setAnswer] = useState('')
  const [response, setResponse] = useState('')
  const [btn, setBtn] = useState(false)
  const [score, setScore] = useState(0)

  const storeQuestion =  quiz[levelNames[quizLevel]][question]

  const loadQuestions = () => {
    const currentLevelQuestions = quiz[levelNames[quizLevel]];
    const currentQuestion = currentLevelQuestions[question];
    setOptions(currentQuestion.options);
    setAnswer(currentQuestion.answer);
  };

  const scoreCount = () => {
    if (response === answer ) {
      setScore(score + 1)
    } else {
      console.log("WRONGG", answer, "not :", response)
    }
  }

  const btnSubmit = () => {
    if (question < MAX_QUESTIONS - 1 ) {
      setQuestion(question + 1)
      setBtn(false)
      scoreCount()
      
      document.querySelectorAll('.answerOptions').forEach(option=> {
        option.classList.remove('active')
      })
    } else {
      console.log("plus de question passez au niveau quivant")
    }
  }

  const handleSelect = (e) => {
    setResponse(e.target.lastChild.data)
    document.querySelectorAll('.answerOptions').forEach(option=> {
      option.classList.remove('active')
    })
    e.target.classList.add('active')
    setBtn(!false)
  }

  useEffect(()=> {
    loadQuestions()
  }, [question, quizLevel])

  return ( 
    <div className='container' >
      <Levels/>
      <ProgressBar progressQ={`Question: ${question+1}/${MAX_QUESTIONS}`} progressP={(question+1)*10} />
      
      <h2>{storeQuestion.question}</h2>

      {options.map((option, index) => (
        <p key={index} onClick={handleSelect} className="answerOptions">
          {option}
        </p>
      ))}
      
      { btn ? (<button onClick={btnSubmit} className="btnSubmit">suivant</button>):(<button onClick={btnSubmit} disabled className="btnSubmit">suivant</button>) }

    </div>
  )
}
  