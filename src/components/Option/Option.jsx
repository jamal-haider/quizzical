import "./Option.scss"

export default function Option({children, backgroundClass, handleOption, disabled}){
    return(
      <button type="button" onClick={handleOption} className={backgroundClass} disabled={disabled}>{children}</button>  
    )
}