import "./Option.scss"

export default function Option(props){

    const styles = {
        // backgroundColor: props.checked ? "#F8BCBC" : "#94D7A2"
    }

    return(
        <>
            <input  type="radio" id={props.questionId + props.value} name={props.questionId + `-correct-option`} value={props.value} onClick={props.handleOption} />
            <label style={styles} htmlFor={props.questionId + props.value}>{props.value}</label>
        </>
    )
}