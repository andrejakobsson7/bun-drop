import React, { useState, useEffect } from "react";
import ErrorText from "./ErrorText";
import useInputField from "../hooks/useInputField";
function UncontrolledInputField(props) {
  const [inputValue, setInputValue] = useState("");
  const [errorText, setErrorText] = useState(null);
  const inputFieldHandler = useInputField();

  function handleInput(e) {
    const input = e.target.value;
    const errorMessage = inputFieldHandler.setErrorMessage(input, props);
    setErrorText(errorMessage);
    setInputValue(input);
    props.onInputChange(props.propName, input);
  }

  useEffect(() => {
    if (props.defaultValue !== undefined) {
      const errorMessage = inputFieldHandler.setErrorMessage(
        props.defaultValue,
        props
      );
      setErrorText(errorMessage);
    }
    setInputValue(props.defaultValue);
    props.onInputChange(props.propName, props.defaultValue);
  }, [props.defaultValue]);
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
        defaultValue={props.defaultValue}
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

export default UncontrolledInputField;
