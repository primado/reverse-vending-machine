import React, { useState } from "react";
import "./pad.css";
 function NumberPad({ onNumberButtonClick, phoneNumber }) {
  const [displayValue, setDisplayValue] = useState(phoneNumber);

  function handleNumberButtonClick(number) {
    const newNumber = displayValue + number;
    setDisplayValue(newNumber);
    onNumberButtonClick(newNumber);
  }

  function handleClearButtonClick() {
    setDisplayValue("");
    onNumberButtonClick("");
  }

  return (
    <div>
      <input type="text" value={displayValue} placeholder="ENTER YOUR NUMBER HERE" readOnly />
      <div className="number-pad">
      <div>
        <button onClick={() => handleNumberButtonClick("1")}>1</button>
        <button onClick={() => handleNumberButtonClick("2")}>2</button>
        <button onClick={() => handleNumberButtonClick("3")}>3</button>
      </div>
      <div>
        <button onClick={() => handleNumberButtonClick("4")}>4</button>
        <button onClick={() => handleNumberButtonClick("5")}>5</button>
        <button onClick={() => handleNumberButtonClick("6")}>6</button>
      </div>
      <div>
        <button onClick={() => handleNumberButtonClick("7")}>7</button>
        <button onClick={() => handleNumberButtonClick("8")}>8</button>
        <button onClick={() => handleNumberButtonClick("9")}>9</button>
      </div>
      <div>
        <button onClick={handleClearButtonClick}>Clear</button>
        <button onClick={() => handleNumberButtonClick("0")}>0</button>
        <button onClick={() => onNumberButtonClick(displayValue)}>OK</button>
      </div>
    </div>
    </div>

    
  );
}
export default NumberPad;