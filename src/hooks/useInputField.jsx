function useInputField() {
  function validateInputVsPattern(input, pattern) {
    const inputPattern = new RegExp(pattern);
    return inputPattern.test(input);
  }

  function getDefaultErrorMessage(propName) {
    return `${propName} is required`;
  }
  function getFormatErrorMessage(propName) {
    return `${propName} has wrong format`;
  }

  function setErrorMessage(input, props) {
    if (input.trim().length === 0 && props.isRequired) {
      return getDefaultErrorMessage(props.inputName);
    } else if (validateInputVsPattern(input, props.pattern) === false) {
      return getFormatErrorMessage(props.inputName);
    } else {
      return "";
    }
  }
  return { validateInputVsPattern, getDefaultErrorMessage, setErrorMessage };
}

export default useInputField;
