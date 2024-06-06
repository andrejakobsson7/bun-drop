import React, { useState, useContext, useEffect } from "react";
import PageLabel from "../components/PageLabel";
import ControlledInputField from "../components/ControlledInputField";
import ErrorText from "../components/ErrorText";
import useFetch from "../hooks/useFetch";
import useInputField from "../hooks/useInputField";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import "../styles/pages/SignIn.css";
function SignIn() {
  const [validationError, setValidationError] = useState("");
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const fetchUrl = "http://localhost:9999/users/";
  const fetchHandler = useFetch();
  const inputHandler = useInputField();
  const authHandler = useContext(AuthContext);

  const navigate = useNavigate();
  const defaultSignInErrorMessage = "Invalid email and/or password";

  async function handleSubmit(e) {
    setValidationError("");
    e.preventDefault();
    //Get user with email
    const foundUser = await fetchHandler.fetchData(
      fetchUrl + userCredentials.email
    );
    if (foundUser !== null) {
      //Check password
      if (
        inputHandler.compareInputs(userCredentials.password, foundUser.password)
      ) {
        //Navigate to home page
        navigate("/");
        //Set context
        authHandler.signIn(foundUser);
      } else {
        setValidationError(defaultSignInErrorMessage);
      }
    } else {
      setValidationError(defaultSignInErrorMessage);
    }
  }
  function handleInputChange(propName, inputValue) {
    const userCredsCopy = { ...userCredentials };
    userCredsCopy[propName] = inputValue;
    setUserCredentials(userCredsCopy);
  }

  return (
    <div id="sign-in-container">
      <div id="sign-in-label-wrapper">
        <PageLabel label="SIGN IN" />
      </div>
      <div id="sign-in-info-wrapper">
        <strong>Enter credentials to get access to your account</strong>
      </div>
      <form id="sign-in-form-wrapper" onSubmit={handleSubmit}>
        <div className="sign-in-user-input-wrapper">
          <ControlledInputField
            inputName="Email"
            inputId="sign-in-email-input"
            inputType="email"
            propName="email"
            isRequired={true}
            value={userCredentials.email}
            onInputChange={handleInputChange}
          />
        </div>
        <div className="sign-in-user-input-wrapper">
          <ControlledInputField
            inputName="Password"
            inputId="sign-in-password-input"
            inputType="password"
            propName="password"
            isRequired={true}
            value={userCredentials.password}
            onInputChange={handleInputChange}
          />
        </div>
        {validationError ? <ErrorText text={validationError} /> : ""}
        <div className="sign-in-user-btn-wrapper">
          <button type="submit" className="sign-in-user-btn">
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
