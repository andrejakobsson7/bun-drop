import React, { useState, useEffect } from "react";
import ErrorText from "./ErrorText";
import useInputField from "../hooks/useInputField";

function ControlledInputField(props) {
  const [inputValue, setInputValue] = useState("");
  const [errorText, setErrorText] = useState(null);
  const inputFieldHandler = useInputField();

  function handleInput(e) {
    const input = e.target.value;
    const errorMessage = inputFieldHandler.setErrorMessage(input, props);
    setErrorText(errorMessage);
    setInputValue(input);
    // if (props.onDefaultInputChange !== undefined) {
    //   props.onDefaultInputChange(input);
    // }
    props.onInputChange(props.propName, input);
  }
  return (
    <>
      <label htmlFor={props.inputId}>
        {props.inputName}{" "}
        {errorText === "" ? <i className="bi bi-check-circle-fill"></i> : ""}
      </label>
      <input
        id={props.inputId}
        type={props.inputType}
        onChange={handleInput}
        value={inputValue}
        pattern={props.pattern}
        minLength={props.minLength}
        maxLength={props.maxLength}
        min={props.minValue}
        required={props.isRequired}
      />
      <ErrorText text={errorText} />
    </>
  );
}

export default ControlledInputField;
