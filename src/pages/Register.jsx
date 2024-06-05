import React, { useEffect, useState } from "react";
import PageLabel from "../components/PageLabel";
import ControlledInputField from "../components/ControlledInputField";
import ErrorText from "../components/ErrorText";
import useFetch from "../hooks/useFetch";
import usePost from "../hooks/usePost";
import useInputField from "../hooks/useInputField";
import SuccessDialog from "../components/SuccessDialog";
import ErrorDialog from "../components/ErrorDialog";
import User from "../classes/user";
import "../styles//pages/Register.css";

function Register() {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
    confirmedPassword: "",
  });
  const [validationError, setValidationError] = useState("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
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
        const newUser = new User(
          userCredentials.email,
          userCredentials.password
        );
        await postHandler.saveData(fetchUrl, newUser, "POST");
      } else {
        setValidationError(
          `Email ${userCredentials.email} is already in use, please choose another email`
        );
      }
    }
  }

  useEffect(() => {
    if (postHandler.data !== null) {
      setShowSuccessDialog(true);
    }
  }, [postHandler.data]);

  function handleInputChange(propName, inputValue) {
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
          Register to enjoy first hand access to special offers and to get a
          smoother order process
        </strong>
      </div>
      <form id="register-form-wrapper" onSubmit={handleSubmit}>
        <div className="register-user-input-wrapper">
          <ControlledInputField
            inputName="Email"
            inputId="register-email-input"
            inputType="email"
            propName="email"
            isRequired={true}
            value={userCredentials.email}
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
            value={userCredentials.password}
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
            value={userCredentials.confirmedPassword}
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
      {showSuccessDialog ? (
        <SuccessDialog
          navigationSuggestion="sign in page"
          navigationSuggestionUrl="/signin"
          confirmationText="You are now officially a Bun Drop-member!"
        />
      ) : (
        ""
      )}
      {postHandler.error !== "" ? (
        <ErrorDialog
          errorText={postHandler.error}
          action="registering user"
          url={fetchUrl}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default Register;
