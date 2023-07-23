import { useState, useEffect } from "react"

import he from "he"
import "./Questions.scss"
import { nanoid } from "nanoid";
import Option from "../../components/Option/Option";

export default function Questions(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [score, setScore] = useState(0)
  const [gameOn, setGameOn] = useState(true)
  const [playAgain, setPlayAgain] = useState(false)
  

  
  function shuffleArray(array){
    for(let i = array.length - 1; i > 0; i -- ){
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array
  }

  const getData = async () =>  {
    const res = await fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple")
    const data = await res.json()

    setItems(data.results.map(item  => {
      const options = [...item.incorrect_answers, item.correct_answer]
      const shuffledArray = shuffleArray(options)
      return {
        id: nanoid(),
        question: he.decode(item.question),
        options: shuffledArray.map(option => (
          {
            text: he.decode(option),
            backgroundClass: 'transparent',
            disabled: false
          }
          )),
        // options: options,
        correct_answer: item.correct_answer,
        checked_answer: '',
      }
    }))
    setLoading(false)
    setPlayAgain(false)
  }
  
  useEffect(() => {
    getData()
  }, [playAgain])

 
  const handleOption = (questionId, inputOption) => {
    
    setItems(prevItems => prevItems.map(item => {
      return (item.id === questionId)
        ? { 
          ...item,
          checked_answer: inputOption,
          options: item.options.map(option => (
            {
              ...option,
              backgroundClass: option.text === inputOption ? 'checked' : 'transparent'
          }))
        }
        : item
      }
    ))
  }

  const checkAnswers = () => {
    setGameOn(false)
    setItems(prev => prev.map(item => (
      {
        ...item,
        options: item.options.map(option => {

          let backgroundClass
          if(item.correct_answer === option.text){
            backgroundClass = 'correct'
          }else if(item.checked_answer !== item.correct_answer && item.checked_answer === option.text){
            backgroundClass = 'wrong'
          }

          return {
            ...option,
            backgroundClass: backgroundClass,
            disabled: true
          }
        })
      }
    )))

   
    
    setScore(items.reduce((acc, item) => 
      {
        return (item.checked_answer == item.correct_answer) ? acc + 1 : acc
      },0)
    )

  }

  const newGame = () => {
    setPlayAgain(true)
    setGameOn(true)
    setLoading(true)
    setScore(0)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return(
    <div className="questions__list">
      {
        loading ? 
        <div className="loading">
          <h2>Loading...</h2>
        </div>
        : 
        <>
          {
            items.map(item => (
              <div className="item" key={item.question}>
                  <h2>{item.question}</h2>
                  <div className="options">
                      {item.options.map((option, index) => 
                          {
                            return <Option
                              key={index}
                              className={option.backgroundClass}
                              disabled={option.disabled}
                              onClick={() => handleOption(item.id, option.text)}
                            >
                              {option.text}
                            </Option>
                          }
                      )}
                  </div>
              </div>
            ))
          }

          {gameOn
            ? <button className="main-button" onClick={checkAnswers}>Check answers</button>
            :
              <div className="questions__list-results">
                <h3>You scored {score}/5 correct answers</h3>
                <button className="main-button" onClick={newGame}>New game</button>
              </div>
          }

        </>
      }
    </div>
  )
}