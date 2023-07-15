import { useState, useEffect } from "react"

import he from "he"
import "./Questions.scss"
import { nanoid } from "nanoid";
import Option from "../../components/Option/Option";
import { Link } from "react-router-dom";

export default function Questions(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [score, setScore] = useState(null)
  const [gameOn, setGameOn] = useState(true)


  function shuffleArray(array){

    for(let i = array.length - 1; i > 0; i -- ){
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }

    return array

    // let currentIndex = array.length
    // let randomIndex

    // while(currentIndex != 0){
    //     randomIndex = Math.floor(Math.random() * currentIndex)
    //     currentIndex --
    //     [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
    // }
  }

  const getData = async () =>  {
    const res = await fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple")
    const data = await res.json()

    setItems(data.results.map(item  => {
      const options = [...item.incorrect_answers, item.correct_answer]
      // const options = [...item.incorrect_answers]
      const shuffledArray = shuffleArray(options)

      return {
        id: nanoid(),
        question: he.decode(item.question),
        options: shuffledArray.map(option => he.decode(option)),
        correct_answer: item.correct_answer,
      }
    }))
    setLoading(false)
  }
  
  useEffect(() => {
    setGameOn(true)
    setLoading(true)
    getData()
  }, [gameOn])

  const handleOption = (questionId, option) => {
    setItems(prevItems => prevItems.map(item => {
      return (item.id === questionId)
        ? { ...item, checked_answer: option }
        : item
      }
    ))
  }

  const itemsEl = items.map(item => (
    <div className="item" key={item.question}>
        <h2>{item.question}</h2>
        <div className="options">
            {item.options.map((option, index) => 
                <Option
                    key={index}
                    value={option}
                    questionId={item.id}  
                    handleOption={() => handleOption(item.id, option)}
                />
            )}
        </div>
    </div>
  ))

  const checkAnswers = () => {
    let calulateScore = 0
    items.forEach(item => {
      if(item.checked_answer === item.correct_answer){
        calulateScore++
      }
    })
    setScore(calulateScore)
  }

  const newGame = () =>{
    setGameOn(false)
    setScore(null)
  }
  
  console.log(score)

  return(
    <div className="questions__list">
      {
        loading ? 
        <div className="loading">
          <h2>Loading...</h2>
        </div>
        : 
        <>
          {itemsEl}
          <div className="questions__list-results">
              {
                score === null ? 
                  <button className="main-button" onClick={checkAnswers}>Check answers</button>
                :
                  <>
                    <h3>You scored {score}/5 correct answers</h3> 
                    <button className="main-button" onClick={newGame}>New Game</button>
                  </>
              }
          </div>
        </>
      }
    </div>
  )
}