import React, { useState } from "react";
import PageLabel from "../components/PageLabel";
import ControlledInputField from "../components/ControlledInputField";
import ErrorText from "../components/ErrorText";
import useFetch from "../hooks/useFetch";
import usePost from "../hooks/usePost";
import useInputField from "../hooks/useInputField";

function Register() {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
    confirmedPassword: "",
  });
  const [validationError, setValidationError] = useState("");
  const fetchUrl = "http://localhost:9999/users/";
  const fetchHandler = useFetch();
  const postHandler = usePost();
  const inputHandler = useInputField();

  async function handleSubmit(e) {
    setValidationError("");
    e.preventDefault();

    //Verify password and confirmed password are the same
    if (
      inputHandler.compareInputs(
        userCredentials.password,
        userCredentials.confirmedPassword
      ) === false
    ) {
      setValidationError("Passwords doesn't match");
    } else {
      //Get user with email
      const foundUserWithEmail = await fetchHandler.fetchData(
        fetchUrl + userCredentials.email
      );
      if (foundUserWithEmail === null) {
        const newUser = {
          id: userCredentials.email,
          password: userCredentials.password,
        };
        const response = await postHandler.postData(fetchUrl, newUser);
        if (response.ok) {
          //Show success dialog
        }
      } else {
        setValidationError(
          `Email ${userCredentials.email} is already in use, please choose another email`
        );
      }
    }
  }
  function handleInputChange(propName, inputValue) {
    console.log(propName, inputValue);
    const userCredsCopy = { ...userCredentials };
    userCredsCopy[propName] = inputValue;
    setUserCredentials(userCredsCopy);
  }

  return (
    <div id="register-container">
      <div id="register-label-wrapper">
        <PageLabel label="REGISTER"></PageLabel>
      </div>
      <div id="register-info-wrapper">
        <strong>
          Register to get exclusive preview on special offers and to get a
          smoother order process
        </strong>
      </div>
      <form id="register-form-wrapper" onSubmit={handleSubmit}>
        <div id="register-label-input-wrapper">
          <h3>User information</h3>
        </div>
        <div className="register-user-input-wrapper">
          <ControlledInputField
            inputName="Email"
            inputId="register-email-input"
            inputType="email"
            propName="email"
            isRequired={true}
            onInputChange={handleInputChange}
          />
        </div>
        <div className="register-user-input-wrapper">
          <ControlledInputField
            inputName="Password"
            inputId="register-password-input"
            inputType="password"
            propName="password"
            isRequired={true}
            onInputChange={handleInputChange}
          />
        </div>
        <div className="register-user-input-wrapper">
          <ControlledInputField
            inputName="Confirm password"
            inputId="register-confirm-password-input"
            inputType="password"
            propName="confirmedPassword"
            isRequired={true}
            onInputChange={handleInputChange}
          />
        </div>
        {validationError !== "" ? (
          <div>
            <ErrorText text={validationError} />
          </div>
        ) : (
          ""
        )}
        <div className="register-user-btn-wrapper">
          <button type="submit" className="register-user-btn">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
