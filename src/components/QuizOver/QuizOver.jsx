import React, { forwardRef, useEffect, useState } from 'react'
import { GiTrophyCup } from 'react-icons/gi'
import Modal from '../Modal/Modal'
import axios from 'axios'
import { Link } from 'react-router-dom'

const QuizOver = forwardRef((props, ref) => {

    const [tables, setTables] = useState([])
    const [modal, setModal] = useState(false)
    const [characterData, setCharacterData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const gradePercent = (props.score * 100) / 10

    const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_KEY;

    useEffect(()=>{
        setTables(...tables, props.questionsAndAnswers)

        if(localStorage.getItem('marvelStorageDate')) {
            const date = localStorage.getItem('marvelStorageDate')
            checkDataAge(date)
        }
    },[props.questionsAndAnswers])

    const checkDataAge =date=> {
        const today = Date.now()
        const differenceTime = today - date
        const daysDifference = differenceTime / (1000 * 3600 * 24)

        if (daysDifference >= 15) {
            localStorage.clear();
            localStorage.setItem('marvelStorageDate',Date.now())
        }
    }

    const restartLevelQuiz = ()=> {
        props.restartLevel()
    }

    const showModal = (heroId)=> {
        setModal(!false)

        if (localStorage.getItem(heroId)) {
            setCharacterData(JSON.parse(localStorage.getItem(heroId)))
            setIsLoading(!isLoading)

        } else {
            axios
            .get(`https://gateway.marvel.com/v1/public/characters/${heroId}`, {
                params: {
                    apikey: API_PUBLIC_KEY
                }
            })
            .then(response => {
                setCharacterData(response.data)
                setIsLoading(!isLoading)
                console.log(response.data)
    
                localStorage.setItem(heroId,JSON.stringify(response.data))
                if (!localStorage.getItem('marvelStorageDate')){
                    localStorage.setItem('marvelStorageDate',Date.now())
                }
            })
            .catch(error => console.log(error))
        }
    }

    const hideModal =()=> {
        setModal(false)
        setIsLoading(true) 
    }

    const firstLetterCapitalized = string => string.charAt(0).toUpperCase() + string.slice(1)

    const resultModal = !isLoading ? (
        <>
             <div className="modalHeader">
                <h2>{characterData.data.results[0].name}</h2>
            </div>
            <div className="modalBody">
                <div className="comicImage">
                    <img 
                        src={`${characterData.data.results[0].thumbnail.path}.${characterData.data.results[0].thumbnail.extension}`} 
                        alt={characterData.data.results[0].name}  
                    />
                    <p>{characterData.attributionText}</p>
                </div>
                <div className="comicDetails">
                    <h3>Description</h3>
                    {
                        characterData.data.results[0].description ?
                        <p>{characterData.data.results[0].description}</p>:
                        <p>Description indisponible ...</p>
                    }

                    <h3>Plus d'Infos</h3>
                    {
                        characterData.data.results[0].urls &&
                        characterData.data.results[0].urls.map((url, index)=> {
                            return(
                                <a key={index} target='_blank' href={url.url} rel='noopener noreferrer'>
                                    {firstLetterCapitalized(url.type)}
                                </a>
                            )
                        })
                    }
                </div>
            </div>
            <div className="modalFooter">
                <button className="modalBtn">Fermer</button>
            </div>
        </>
    ):(
        <>
            <div className="modalHeader">
                <h2>Réponse de Marvel....</h2>
            </div>
            <div className="modalBody">
                <div className="loader"></div>
            </div>
        </>
    )

  return ( 
    <>
        <div className='stepsBtnContainer' >
            {gradePercent > 40 ? (props.quizLevel ? (<p className="successMsg">"Bravo, Passez au niveau suivant "</p>):
            (<p className="successMsg"><GiTrophyCup size='50px' color='green' /> "Bravo, vous êtes un expert"</p>)):
            (<p className="failureMsg"> "Vous avez echoué !"</p>)}
            
            { gradePercent > 40 ? ( props.quizLevel ? (<button onClick={props.handleNextLevel} className="btnResult successMsg">Niveau Suivant</button>):(<button onClick={props.handleRestart} className="btnResult successMsg">Recommencer le Quiz</button>)):
            ('')}
        </div>     
        <div className="percentage">
            <div className="progressPercent">Réussite: {gradePercent}%</div>
            <div className="progressPercent">Note: {props.score}/10</div>
        </div>

        <hr />
        <p>Les réponses aux questions posées:</p>
        <div className="answerContainer">
            <table className="answers">
                <thead>
                    <tr>
                        <th>Question</th>
                        <th>Réponses</th>
                        <th>infos</th>
                    </tr>
                </thead>
                { gradePercent > 40 ? (<tbody>
                    {tables.map((table, index)=> {
                        const colorRow = table.isCorrect ? "#ade0ad":"#c98e8e"
                        return(
                            <tr style={{backgroundColor:colorRow}} key={index}>
                                <td>{table.question}</td>
                                <td>{table.answer}</td>
                                <td><button onClick={()=>showModal(table.id)} className='btnInfo'>infos</button></td>
                            </tr>
                        )
                    })}
                </tbody>):(
                    <tbody>
                        <tr style={{textAlign:'center'}}>
                            <td colSpan="3">
                                <div className="loader"></div>
                                <p className="loaderText" style={{color:'red'}}>Pas de réponse pour vous</p>
                                <button onClick={restartLevelQuiz} className="btnSubmit">Réessayer</button>
                            </td>
                        </tr>
                    </tbody>
                )}

            </table>
        </div>
        <Modal showModal={modal} hideModal={hideModal}>
           {resultModal}
        </Modal>
    </>
  )
})

export default React.memo(QuizOver)