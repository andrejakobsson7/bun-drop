function useInputField() {
  const patterns = {
    email: {
      pattern: ".*@.*..*",
      error: "Email should be formatted as example@example.com",
    },
    password: {
      pattern:
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*\\-]).{8,}$",
      error:
        "Password should be a minimum of eight characters with one uppercase letter, one lowercase letter, one number and one special character",
    },
    tel: {
      pattern: "0[0-9]{9}",
      error: "Phone number should start with 0 and be 10 digits",
    },
    postalNumber: {
      pattern: "^[0-9]{5,}$",
      error: "Postal number should be at least 5 digits",
    },
    cardNumber: {
      pattern: "^[0-9]{15,16}$",
      error: "Card number should be 15 or 16 digits",
    },
    cvc: {
      pattern: "^[0-9]{3,3}$",
      error: "CVC should be a 3-digit number",
    },
  };

  function getPattern(inputType, propName) {
    const foundPattern = findPattern(inputType, propName);
    if (foundPattern !== undefined) {
      return foundPattern.pattern;
    }
    return foundPattern;
  }

  function findPattern(inputType, propName) {
    let foundPattern = undefined;
    let patternObj = patterns[inputType];
    if (patternObj !== undefined) {
      foundPattern = patternObj;
    } else {
      patternObj = patterns[propName];
      if (patternObj !== undefined) {
        foundPattern = patternObj;
      }
    }
    return foundPattern;
  }

  function validateInputVsPattern(input, pattern) {
    if (pattern !== undefined) {
      const regexPattern = new RegExp(pattern);
      return regexPattern.test(input);
    }
    return true;
  }

  function getDefaultErrorMessage(propName) {
    return `${propName} is required`;
  }
  function getFormatErrorMessage(inputType, propName) {
    const foundPattern = findPattern(inputType, propName);
    return `${foundPattern.error}`;
  }
  function getNonMatchingInputsErrorMessage(inputType) {
    const formattedInputTypeName =
      inputType[0].toUpperCase() + inputType.slice(1);
    return `${formattedInputTypeName}s doesn't match`;
  }

  function setErrorMessage(input, props, pattern) {
    const trimmedInput = input.trim();
    if (trimmedInput.length === 0 && props.isRequired) {
      return getDefaultErrorMessage(props.inputName);
    } else if (
      trimmedInput.length > 0 &&
      validateInputVsPattern(input, pattern) === false
    ) {
      return getFormatErrorMessage(props.inputType, props.propName);
    } else if (
      trimmedInput.length > 0 &&
      props.comparisonValue !== undefined &&
      compareInputs(trimmedInput, props.comparisonValue) === false
    ) {
      return getNonMatchingInputsErrorMessage(props.inputType);
    } else {
      return "";
    }
  }
  function compareInputs(firstInput, secondInput) {
    return firstInput === secondInput;
  }
  return {
    validateInputVsPattern,
    getDefaultErrorMessage,
    setErrorMessage,
    getPattern,
    compareInputs,
  };
}

export default useInputField;
