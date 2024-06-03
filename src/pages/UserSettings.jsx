import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import "../styles/UserSettingsStyle.css";
import "../styles/Button.css";
import PageLabel from "../components/PageLabel";
import useLocalStorage from "../hooks/useLocalStorage";
import ControlledInputField from "../components/ControlledInputField";
import UncontrolledInputField from "../components/UncontrolledInputField";
import useDate from "../hooks/useDate";
import usePost from "../hooks/usePost";
import SuccessDialog from "../components/SuccessDialog";
import ErrorDialog from "../components/ErrorDialog";

function UserSettings() {
  const [selectedAction, setSelectedAction] = useState("");
  const [user, setUser] = useState({});
  const [originalName, setOriginalName] = useState("");
  const [url, setUrl] = useState("");
  const [userSuccessfullyUpdated, setUserSuccessfullyUpdated] = useState(null);
  const [postingError, setPostingError] = useState("");
  const authHandler = useContext(AuthContext);
  const localStorageHandler = useLocalStorage();
  const dateHandler = useDate();
  const todaysYearAndMonth = dateHandler.getYearAndMonth();
  const postHandler = usePost();
  const baseUrl = "http://localhost:9999/users/";

  useEffect(() => {
    //Fetch user from local storage
    const getSignedInUser = async () => {
      const user = await localStorageHandler.getLocalStorage("signedInUser");
      if (user !== null) {
        setUser(user);
        const userId = user.id;
        setUrl(baseUrl + userId);
        setOriginalName(user.firstName + " " + user.lastName);
      }
    };
    if (authHandler.isAuthenticated) {
      getSignedInUser();
    } else {
      console.log("You are not authenticated...");
      //TODO: REDIRECT TO ERROR PAGE OR SHOW ERROR
    }
  }, [authHandler]);

  function handleSettingsSelect(e) {
    const action = e.target.value;
    setSelectedAction(action);
  }
  function handleInputChange(propName, inputValue) {
    const userCopy = { ...user };
    userCopy[propName] = inputValue;
    setUser(userCopy);
  }
  async function handleSubmit(e) {
    setUserSuccessfullyUpdated(null);
    setPostingError("");
    e.preventDefault();
    //Make put request
    const response = await postHandler.setData(url, user, "PUT");
    if (response.ok) {
      setUserSuccessfullyUpdated(true);
      localStorageHandler.setLocalStorage("signedInUser", user);
      setOriginalName(user.firstName + " " + user.lastName);
    } else {
      setUserSuccessfullyUpdated(false);
      setPostingError(response.statusText);
    }
  }
  function handlePaymentSelect(e) {
    const selectedOption = e.target.value;
    //Store preffered payment option with the user
    const userCopy = { ...user };
    userCopy.paymentOption = selectedOption;
    setUser(userCopy);
  }
  return (
    <div id="user-settings-container">
      <div id="user-settings-label-wrapper">
        <PageLabel label="SETTINGS"></PageLabel>
      </div>
      <div id="user-settings-info-wrapper">
        <p>
          <strong>Welcome {originalName}</strong>
          <br />
          <span> Here you can manage your account.</span>
          <br />
          Select what you want to do in the dropdown menu below
        </p>
      </div>
      <div id="user-settings-selector-wrapper">
        <label>Action</label>
        <select value={""} onChange={handleSettingsSelect}>
          <option value="" disabled hidden>
            Select action
          </option>
          <option value="1">Manage favorites</option>
          <option value="2">Update my information</option>
          <option value="3">Remove account</option>
        </select>
      </div>
      {selectedAction === "1" ? (
        <div id="user-settings-favorites-wrapper">
          <label>Manage favorites</label>
        </div>
      ) : selectedAction === "2" ? (
        <form id="user-settings-form-wrapper" onSubmit={handleSubmit}>
          <div className="user-settings-form-label">
            <h3>Contact</h3>
          </div>
          <div
            id="user-settings-first-name-wrapper"
            className="user-settings-input-wrapper"
          >
            <ControlledInputField
              inputId="user-settings-first-name-input"
              inputName="First name"
              inputType="text"
              propName="firstName"
              value={user.firstName}
              onInputChange={handleInputChange}
            ></ControlledInputField>
          </div>
          <div
            id="user-settings-last-name-wrapper"
            className="user-settings-input-wrapper"
          >
            <ControlledInputField
              inputId="user-settings-last-name-input"
              inputName="Last name"
              inputType="text"
              propName="lastName"
              value={user.lastName}
              onInputChange={handleInputChange}
            ></ControlledInputField>
          </div>
          <div
            id="user-settings-email-wrapper"
            className="user-settings-input-wrapper"
          >
            <ControlledInputField
              inputId="user-settings-email-input"
              inputName="Email"
              inputType="email"
              propName="id"
              value={user.id}
              disabled={true}
              onInputChange={handleInputChange}
            ></ControlledInputField>
          </div>
          <div
            id="user-settings-phone-wrapper"
            className="user-settings-input-wrapper"
          >
            <ControlledInputField
              inputId="user-settings-phone-input"
              inputName="Phone number"
              inputType="tel"
              propName="contactPhoneNumber"
              value={user.contactPhoneNumber}
              maxLength={10}
              onInputChange={handleInputChange}
            ></ControlledInputField>
          </div>
          <div className="user-settings-form-label">
            <h3>Delivery</h3>
          </div>
          <div
            id="user-settings-street-wrapper"
            className="user-settings-input-wrapper"
          >
            <ControlledInputField
              inputId="user-settings-street-input"
              inputName="Street name"
              inputType="text"
              propName="streetName"
              value={user.streetName}
              onInputChange={handleInputChange}
            ></ControlledInputField>
          </div>
          <div
            id="user-settings-house-number-wrapper"
            className="user-settings-input-wrapper"
          >
            <ControlledInputField
              inputId="user-settings-house-number-input"
              inputName="House/apartment number"
              inputType="text"
              propName="houseNumber"
              value={user.houseNumber}
              onInputChange={handleInputChange}
            ></ControlledInputField>
          </div>
          <div
            id="user-settings-postal-number-wrapper"
            className="user-settings-input-wrapper"
          >
            <ControlledInputField
              inputId="user-settings-postal-number-input"
              inputName="Postal number"
              inputType="text"
              propName="postalNumber"
              value={user.postalNumber}
              onInputChange={handleInputChange}
            ></ControlledInputField>
          </div>
          <div
            id="user-settings-city-wrapper"
            className="user-settings-input-wrapper"
          >
            <ControlledInputField
              inputId="user-settings-city-input"
              inputName="City"
              inputType="text"
              propName="city"
              value={user.city}
              onInputChange={handleInputChange}
            ></ControlledInputField>
          </div>
          <div className="user-settings-form-label">
            <h3>Payment</h3>
          </div>
          <div
            id="user-settings-payment-type-wrapper"
            className="user-settings-input-wrapper"
          >
            <label>Preffered payment type</label>
            <select
              defaultValue={user.paymentOption}
              onChange={handlePaymentSelect}
            >
              <option value="" disabled hidden>
                Select payment type
              </option>
              <option value="swish">Swish</option>
              <option value="credit-card">Credit card</option>
            </select>
          </div>
          {user.paymentOption === "swish" ? (
            <div
              id="user-settings-swish-wrapper"
              className="user-settings-input-wrapper"
            >
              <UncontrolledInputField
                inputId="user-settings-paying-phone-input"
                inputName="Phone number"
                inputType="tel"
                propName="payingPhoneNumber"
                defaultValue={user.payingPhoneNumber}
                maxLength={10}
                onInputChange={handleInputChange}
              />
            </div>
          ) : user.paymentOption === "credit-card" ? (
            <div
              id="user-settings-credit-card-wrapper"
              className="user-settings-input-wrapper"
            >
              <div
                id="user-settings-card-number-wrapper"
                className="user-settings-input-wrapper"
              >
                <ControlledInputField
                  inputId="user-settings-card-number-input"
                  inputName="Card number"
                  inputType="text"
                  propName="cardNumber"
                  maxLength={16}
                  value={user.cardNumber}
                  onInputChange={handleInputChange}
                ></ControlledInputField>
              </div>
              <div
                id="user-settings-credit-card-exp-date-wrapper"
                className="user-settings-input-wrapper"
              >
                <ControlledInputField
                  inputId="user-settings-card-expiration-input"
                  inputName="Expiration date"
                  inputType="month"
                  propName="expirationDate"
                  minValue={todaysYearAndMonth}
                  value={user.expirationDate}
                  onInputChange={handleInputChange}
                ></ControlledInputField>
              </div>
              <div
                id="user-settings-credit-card-cvc-wrapper"
                className="user-settings-input-wrapper"
              >
                <ControlledInputField
                  inputId="user-settings-card-cvc-input"
                  inputName="CVC"
                  inputType="text"
                  propName="cvc"
                  maxLength={3}
                  value={user.cvc}
                  onInputChange={handleInputChange}
                ></ControlledInputField>
              </div>
            </div>
          ) : (
            ""
          )}
          <div id="save-user-btn-wrapper">
            <button className="action-btn save-user-info-btn" type="submit">
              Save
            </button>
          </div>
        </form>
      ) : selectedAction === "3" ? (
        <div id="user-settings-remove-account-wrapper">
          <label>Remove account</label>
        </div>
      ) : (
        ""
      )}
      {userSuccessfullyUpdated ? (
        <SuccessDialog
          navigationSuggestion="menu"
          navigationSuggestionUrl="/menu"
          confirmationText="Your information has been updated!"
        />
      ) : userSuccessfullyUpdated === false ? (
        <ErrorDialog
          action="updating user information"
          errorText={postingError}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default UserSettings;
