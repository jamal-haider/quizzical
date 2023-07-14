import { Link } from "react-router-dom";
import "./StartQuiz.scss"

export default function StartQuiz(){
  return(
    <div className="start-quiz">
      <h1>Quizzical</h1>
      <p>The quiz will be started once you click the start button.</p>
      <Link to="/questions">Start</Link>
    </div>
  )
}