import React, { useState } from "react";
import ErrorText from "./ErrorText";

function InputField(props) {
  const [inputValue, setInputValue] = useState("");
  const [errorText, setErrorText] = useState("");
  function handleInput(e) {
    setInputValue(e.target.value);
    // if(inputValue)
  }
  return (
    <>
      <label htmlFor={props.inputId}>{props.inputName}</label>
      <input
        id={props.inputId}
        type={props.inputType}
        onChange={handleInput}
        value={inputValue}
      />
      <p className="error-text">
        <small>{errorText}</small>
      </p>
    </>
  );
}

export default InputField;
