import "./Option.scss"

export default function Option({value, backgroundClass, handleOption}){
    return(
      <button onClick={handleOption} className={backgroundClass}>{value}</button>  
    )
}