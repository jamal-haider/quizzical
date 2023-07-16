import "./Option.scss"

export default function Option(props){

    return(
        <>
            <input
              type="radio"
              id={props.questionId + props.text}
              name={props.questionId + `-correct-option`}
              value={props.text}
              
               />

            <label
              onClick={props.handleOption}
              className={`${props.backgroundClass}`}
              htmlFor={props.questionId + props.value}
              
            >
              {props.value}
            </label>
        </>
    )
}