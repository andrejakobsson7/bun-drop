import React, { useState, useContext } from "react";
import PageLabel from "../components/PageLabel";
import ControlledInputField from "../components/ControlledInputField";
import ErrorText from "../components/ErrorText";
import useFetch from "../hooks/useFetch";
import useInputField from "../hooks/useInputField";
import useLocalStorage from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
function SignIn() {
  const [validationError, setValidationError] = useState("");
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const [signedInUser, setSignedInUser] = useState(null);
  const fetchUrl = "http://localhost:9999/users/";
  const fetchHandler = useFetch();
  const inputHandler = useInputField();
  const localStorageHandler = useLocalStorage();
  const authHandler = useContext(AuthContext);

  const navigate = useNavigate();
  const defaultSignInErrorMessage = "Invalid email and/or password";

  async function handleSubmit(e) {
    console.log(userCredentials);
    setValidationError("");
    e.preventDefault();
    //Get user with username
    const foundUser = await fetchHandler.fetchData(
      fetchUrl + userCredentials.email
    );
    console.log("Received", foundUser);
    if (foundUser !== null) {
      //Check password
      if (
        inputHandler.compareInputs(userCredentials.password, foundUser.password)
      ) {
        console.log("Username and password is OK..");
        //Sign in user
        localStorageHandler.setLocalStorage("signedInUser", foundUser);
        //Navigate to home page
        navigate("/");
        //Set context
        authHandler.signIn();
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
