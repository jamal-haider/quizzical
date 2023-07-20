import "./Option.scss"

export default function Option({children, ...rest}){
    return(
      <button type="button" {...rest}>{children}</button>  
    )
}