import React, { useState, useEffect } from "react";
import ErrorText from "./ErrorText";
import useInputField from "../hooks/useInputField";

function ControlledInputField(props) {
  const [inputValue, setInputValue] = useState("");
  const [errorText, setErrorText] = useState(null);
  const [pattern, setPattern] = useState("");
  const inputFieldHandler = useInputField();
  const [disabled, setDisabled] = useState({});

  function handleInput(e) {
    const input = e.target.value;
    const errorMessage = inputFieldHandler.setErrorMessage(
      input,
      props,
      pattern
    );
    setErrorText(errorMessage);
    setInputValue(input);
    props.onInputChange(props.propName, input);
  }

  useEffect(() => {
    const pattern = inputFieldHandler.getPattern(
      props.inputType,
      props.propName
    );
    setPattern(pattern);
    if (props.disabled) {
      const disabledCopy = { ...disabled };
      disabledCopy["disabled"] = "disabled";
      setDisabled(disabledCopy);
    }
  }, []);
  useEffect(() => {
    setInputValue(props.value);
  }, [props.value]);

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
        pattern={pattern}
        minLength={props.minLength}
        maxLength={props.maxLength}
        min={props.minValue}
        required={props.isRequired}
        {...disabled}
      />
      <ErrorText text={errorText} />
    </>
  );
}

export default ControlledInputField;
