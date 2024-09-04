import React, { useEffect, useRef, useState } from 'react'
import Levels from '../Levels/Levels'
import { QuizMarvel } from '../QuizMarvel/index.js'
import ProgressBar from '../ProgressBar/ProgressBar'
import { Bounce, Flip, ToastContainer, toast } from 'react-toastify';
import { FiChevronRight } from "react-icons/fi";

// css import 
import 'react-toastify/dist/ReactToastify.css';
import QuizOver from '../QuizOver/QuizOver.jsx';

const MAX_QUESTIONS = 10;

export default function Quiz({userData}) {

  // Default Toast Config
  const toastOptions = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  };

  const levelNames = ["debutant", "confirme", "expert"]

  // states 
  const quiz = QuizMarvel[0].quizz
  const [quizLevel, setQuizLevel] = useState(0)
  const [question, setQuestion] = useState(0)
  const [options, setOptions] = useState([])
  const [answer, setAnswer] = useState('')
  const [response, setResponse] = useState('')
  const [btn, setBtn] = useState(false)
  const [score, setScore] = useState(0)
  const [quizOver, setQuizOver] = useState(false)
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([])

  const storeQuestion =  quiz[levelNames[quizLevel]][question]
  const questionsAndAnswersRef = useRef([]);

  const loadQuestions = () => {
    const currentLevelQuestions = quiz[levelNames[quizLevel]]
    const currentQuestion = currentLevelQuestions[question]
    setOptions(currentQuestion.options)
    setAnswer(currentQuestion.answer)
  };

  const updateQuestionsAndAnswers = (isCorrect) => {
    const newQuestion = {
      question: quiz[levelNames[quizLevel]][question].question,
      answer: answer,
      userAnswer: response,
      id: quiz[levelNames[quizLevel]][question].heroId, 
      isCorrect,
    };
    setQuestionsAndAnswers([...questionsAndAnswers, newQuestion]);
  };

  const scoreCount = () => {
    const isCorrect = response === answer.toString();
    if (isCorrect) {
      setScore(score + 1);
      notifySuccess();
    } else {
      notifyError();
    }
    updateQuestionsAndAnswers(isCorrect);
  };

  const btnSubmit = () => {
    if (question <= MAX_QUESTIONS -1 ) {
      if (question === 9) {
        setBtn(false)
        scoreCount()
        setQuizOver(!quizOver)
      } else {
        setQuestion(question + 1)
        setBtn(false)
        scoreCount()
      }
      
      document.querySelectorAll('.answerOptions').forEach(option=> {
        option.classList.remove('active')
      })
    } else {
      scoreCount()
      setBtn(false)
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

  const handleNextLevel = () => {
    
    if (quizLevel < levelNames.length - 1) {
      setQuizLevel(quizLevel + 1);
      setQuestion(0); 
      setOptions([]);
      setAnswer('');
      setResponse('');
      setScore(0);
      setBtn(false);
      setQuizOver(false);
      setQuestionsAndAnswers([]); 
    } else {
      console.log('No more levels');
    }
  };

  const handleRestart = () => {
    setQuizLevel(0);
    setQuestion(0);
    setOptions([]);
    setAnswer('');
    setResponse('');
    setBtn(false);
    setScore(0);
    setQuizOver(false);
    setQuestionsAndAnswers([]);
  };

  const restartLevel = () => {
    setQuestion(0);
    setOptions([]);
    setAnswer('');
    setResponse('');
    setBtn(false);
    setScore(0);
    setQuizOver(false);
    setQuestionsAndAnswers([]);
  };
  
  // Toast Notification
  const notify = (message, type = 'success', transition = Bounce, position= "top-right", autoClose= 2000) => {
    toast[type](message, { ...toastOptions, transition, position, autoClose });
  };
  
  const notifySuccess = () => notify('Bavos + 1 ');
  const notifyError = () => notify('Raté 0 ', 'error');
  const notifyWelcome = (message) => notify(message, 'info', Flip, 'top-center', 5000);
 
  useEffect(()=> {
    loadQuestions()
  }, [question, quizLevel])

  useEffect(()=> {
    // console.log(questionsAndAnswers)
  }, [questionsAndAnswers, question]) 

  useEffect(()=> {
    if (userData !== null ) {
      const pseudo = !!userData && (userData.pseudo)
      if (pseudo) {
        notifyWelcome(`Bienvenue ${pseudo.toUpperCase()} et bon Quiz`)
      }
    } 
  },[userData])
 

  return ( 
    <div className='container' >

      {
        quizOver ? 
        ( 
        <> 
          <QuizOver 
            ref={questionsAndAnswersRef}
            questionsAndAnswers={questionsAndAnswers} 
            score={score}
            handleNextLevel={handleNextLevel}
            handleRestart={handleRestart}
            quizLevel={quizLevel < levelNames.length - 1}
            quizLev={quizLevel}
            restartLevel={restartLevel}
          />  
        </>
        )
        :
        (
        <>
          <Levels levelNames={levelNames} quizLevel={quizLevel} />
          <ProgressBar progressQ={`Question: ${question+1}/${MAX_QUESTIONS}`} progressP={(question+1)*10} />
          <h2>{storeQuestion.question}</h2>

          {options.map((option, index) => (
            <p key={index} onClick={handleSelect} className="answerOptions">
              <FiChevronRight />{option}
            </p>
          ))}

          { btn ? (<button onClick={btnSubmit} className="btnSubmit">suivant</button>):
          (<button onClick={btnSubmit} disabled className="btnSubmit">suivant</button>) 
          }
          
        </>

        )
      }
      
      <ToastContainer/>
    </div>
  )
}
  