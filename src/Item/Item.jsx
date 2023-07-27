import Option from "../components/Option/Option";
import "./Item.scss"

export default function Item({id, question, options, handleOption}){
  // console.log(handleOption)
  return (
    <div className="item" key={id}>
        <h2>{question}</h2>
        <div className="options">
            {options.map(option => (
              <Option
                key={option.text}
                className={option.backgroundClass}
                disabled={option.disabled}
                onClick={() => handleOption(id, option.text)}
              >
                {option.text}
              </Option>
            ))}
        </div>
    </div>
  )
}