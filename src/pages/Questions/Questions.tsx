import { useState, useEffect } from "react"

import he from "he"
import "./Questions.scss"
import { nanoid } from "nanoid";

interface ItemType{
  
  id: string;
  correct_answer: string;
  options: string[];
  question: string;
  answer: boolean;
} 

export default function Questions(){
  const [items, setItems] = useState<ItemType[]>([])


  function shuffleArray(array:string[]){
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
    const data:ItemType[] = await res.json()

    setItems(data.results.map(item  => {
      const options = item.incorrect_answers
      options.push(item.correct_answer)
      return {
          correct_answer: item.correct_answer,
          options: shuffleArray(options),
          question: he.decode(item.question),
          id: nanoid(),
          answer: false
      }
    }))
  }
  
  useEffect(() => {
    getData()

  },[])

console.log(items)
  return(
    <div className="questions">

      <h2>Questions page</h2>
    </div>
  )
}