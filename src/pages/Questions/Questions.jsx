import { useState, useEffect } from "react"

import he from "he"
import "./Questions.scss"
import { nanoid } from "nanoid";
import Option from "../../components/Option/Option";

export default function Questions(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)


  function shuffleArray(array){
    let currentIndex = array.length,  randomIndex;
    while(currentIndex !== 0){
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex --
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
    }
    return array
  }

  const getData = async () =>  {
    const res = await fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple")
    const data = await res.json()

    setItems(data.results.map(item  => {
      const options = item.incorrect_answers
      options.push(item.correct_answer)
      return {
        id: nanoid(),
        question: he.decode(item.question),
        options: shuffleArray(options),
        correct_answer: item.correct_answer,
        checked: false
      }
    }))
    setLoading(false)
  }
  
  useEffect(() => {
    getData()
  }, [])

  console.log(items)

  const handleOption = (questionId, option) => {
    setItems(prevItems => prevItems.map(item => {
      return (item.id === questionId)
        ? { ...item, checked: true }
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
                    value={he.decode(option)}
                    questionId={item.id}  
                    handleOption={() => handleOption(item.id, option)}
                />
            )}
        </div>
    </div>
  ))

  const checkAnswers = () => {

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
          {itemsEl}
          <div className="questions__list-results">
              {/* <h3>You scored {score}/5 correct answers</h3> */}
              <button className="check-answers" onClick={checkAnswers}>Check answers</button>
          </div>
        </>
      }
    </div>
  )
}