import React, { useState, useEffect, useContext } from "react";
import PageLabel from "../components/PageLabel";
import useLocalStorage from "../hooks/useLocalStorage";
import usePost from "../hooks/usePost";
import ControlledInputField from "../components/ControlledInputField";
import UncontrolledInputField from "../components/UncontrolledInputField";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import useCart from "../hooks/useCart";
import useDate from "../hooks/useDate";
import CartEmpty from "../components/CartEmpty";
import ErrorDialog from "../components/ErrorDialog";
import "../styles//pages/Payment.css";
import User from "../classes/user";
function Payment() {
  const [paymentDetails, setPaymentDetails] = useState(new User());
  const [originalUserInfo, setOriginalUserInfo] = useState({});
  const postOrderHandler = usePost();
  const updateUserHandler = usePost();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [rememberUserDetails, setRememberDetails] = useState(false);
  const [userInfoHasChanged, setUserInfoHasChanged] = useState(false);
  const authHandler = useContext(AuthContext);
  const localStorageHandler = useLocalStorage();
  const cartHandler = useCart();
  const dateHandler = useDate();
  const todaysYearAndMonth = dateHandler.getYearAndMonth();
  const postUrl = "http://localhost:9999/orders";
  const updateUserUrl = "http://localhost:9999/users/";

  useEffect(() => {
    const getItemsInCart = async () => {
      const items = await localStorageHandler.getLocalStorage("cartItems");
      if (items !== null) {
        setCart(items);
        const cartTotal = cartHandler.calculateCartTotal(items);
        setCartTotal(cartTotal);
      }
    };
    const getUser = async () => {
      const user = await localStorageHandler.getLocalStorage("signedInUser");
      if (user !== null) {
        setPaymentDetails(user);
        setOriginalUserInfo(user);
      }
    };
    getItemsInCart();
    getUser();
  }, []);

  useEffect(() => {
    //This ensures a successful post has been made
    if (postOrderHandler.data !== null) {
      //Continue and check if user has changed information and wants to store it for future
      if (userInfoHasChanged && rememberUserDetails) {
        updateUser();
      } else {
        handleSuccessfulOrder();
      }
    }
  }, [postOrderHandler.data]);

  useEffect(() => {
    if (updateUserHandler.data !== null) {
      localStorageHandler.setLocalStorage("signedInUser", paymentDetails);
      handleSuccessfulOrder();
    }
  }, [updateUserHandler.data]);

  function handleSuccessfulOrder() {
    localStorageHandler.removeFromLocalStorage("cartItems");
    navigate(`/confirmation/${postOrderHandler.data.id}`);
  }
  const updateUser = async () => {
    await updateUserHandler.saveData(
      updateUserUrl + paymentDetails.id,
      paymentDetails,
      "PUT"
    );
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const orderObj = {
      orderTime: dateHandler.getTodaysDate(),
      user: paymentDetails,
      dishes: cart,
    };
    await postOrderHandler.saveData(postUrl, orderObj, "POST");
  }

  function handlePaymentSelect(e) {
    const selectedPayOption = e.target.value;
    const paymentDetailsCopy = { ...paymentDetails };
    paymentDetailsCopy.paymentOption = selectedPayOption;
    setPaymentDetails(paymentDetailsCopy);
    updateUserChangedStatus(paymentDetailsCopy);
  }

  function handleInputChange(propName, inputValue) {
    const paymentDetailsCopy = { ...paymentDetails };
    paymentDetailsCopy[propName] = inputValue;
    setPaymentDetails(paymentDetailsCopy);
    updateUserChangedStatus(paymentDetailsCopy);
  }
  function handleUserDetailsChange(e) {
    const checked = e.target.checked;
    setRememberDetails(checked);
  }
  function updateUserChangedStatus(paymentDetailsCopy) {
    if (
      JSON.stringify(paymentDetailsCopy) !== JSON.stringify(originalUserInfo)
    ) {
      setUserInfoHasChanged(true);
    } else {
      setUserInfoHasChanged(false);
    }
  }

  return (
    <div id="payment-container">
      <div id="payment-label-wrapper">
        <PageLabel label="PAYMENT"></PageLabel>
      </div>
      <div id="payment-info-wrapper">
        {authHandler.isAuthenticated === false && cart.length > 0 ? (
          <>
            <p>
              <Link to="/signin">Sign in</Link>
              <span> to get your information prefilled</span>
            </p>
            <p>
              Not a member yet? <Link to="/register">Register here!</Link>
            </p>
          </>
        ) : authHandler.isAuthenticated ? (
          <strong>Welcome back {originalUserInfo.firstName}</strong>
        ) : (
          ""
        )}
      </div>
      {cart.length > 0 ? (
        <form id="payment-form-wrapper" onSubmit={handleSubmit}>
          <div id="payment-contact-label" className="payment-form-label">
            <h3>Contact</h3>
          </div>
          <div
            id="payment-first-name-wrapper"
            className="payment-input-wrapper"
          >
            <ControlledInputField
              inputId="payment-first-name-input"
              inputName="First name"
              inputType="text"
              propName="firstName"
              isRequired={true}
              value={paymentDetails.firstName}
              onInputChange={handleInputChange}
            ></ControlledInputField>
          </div>
          <div id="payment-last-name-wrapper" className="payment-input-wrapper">
            <ControlledInputField
              inputId="payment-last-name-input"
              inputName="Last name"
              inputType="text"
              propName="lastName"
              isRequired={true}
              value={paymentDetails.lastName}
              onInputChange={handleInputChange}
            ></ControlledInputField>
          </div>

          <div id="payment-email-wrapper" className="payment-input-wrapper">
            <ControlledInputField
              inputId="payment-email-input"
              inputName="Email"
              inputType="email"
              propName="email"
              isRequired={true}
              value={paymentDetails.id}
              onInputChange={handleInputChange}
              disabled={authHandler.isAuthenticated}
            ></ControlledInputField>
          </div>
          <div id="payment-phone-wrapper" className="payment-input-wrapper">
            <ControlledInputField
              inputId="payment-phone-input"
              inputName="Phone number"
              inputType="tel"
              propName="contactPhoneNumber"
              maxLength={10}
              isRequired={true}
              value={paymentDetails.contactPhoneNumber}
              onInputChange={handleInputChange}
            ></ControlledInputField>
          </div>
          <div id="payment-delivery-label" className="payment-form-label">
            <h3>Delivery</h3>
          </div>
          <div id="payment-street-wrapper" className="payment-input-wrapper">
            <ControlledInputField
              inputId="payment-street-input"
              inputName="Street name"
              inputType="text"
              propName="streetName"
              isRequired={true}
              value={paymentDetails.streetName}
              onInputChange={handleInputChange}
            ></ControlledInputField>
          </div>
          <div
            id="payment-house-number-wrapper"
            className="payment-input-wrapper"
          >
            <ControlledInputField
              inputId="payment-house-number-input"
              inputName="House/apartment number"
              inputType="text"
              propName="houseNumber"
              isRequired={true}
              value={paymentDetails.houseNumber}
              onInputChange={handleInputChange}
            ></ControlledInputField>
          </div>
          <div
            id="payment-postal-number-wrapper"
            className="payment-input-wrapper"
          >
            <ControlledInputField
              inputId="payment-postal-number-input"
              inputName="Postal number"
              inputType="text"
              propName="postalNumber"
              isRequired={true}
              value={paymentDetails.postalNumber}
              onInputChange={handleInputChange}
            ></ControlledInputField>
          </div>
          <div id="payment-city-wrapper" className="payment-input-wrapper">
            <ControlledInputField
              inputId="payment-city-input"
              inputName="City"
              inputType="text"
              propName="city"
              isRequired={true}
              value={paymentDetails.city}
              onInputChange={handleInputChange}
            ></ControlledInputField>
          </div>
          <div id="payment-payment-label" className="payment-form-label">
            <h3>Payment</h3>
          </div>
          <div
            id="payment-payment-type-wrapper"
            className="payment-input-wrapper"
          >
            <label>
              Payment type{" "}
              {paymentDetails.paymentOption !== "" ? (
                <i className="bi bi-check-circle-fill"></i>
              ) : (
                ""
              )}
            </label>
            <select
              defaultValue={paymentDetails.paymentOption}
              onChange={handlePaymentSelect}
              required
            >
              <option value="" disabled hidden>
                Select payment type
              </option>
              <option value="swish">Swish</option>
              <option value="credit-card">Credit card</option>
            </select>
          </div>
          {paymentDetails.paymentOption === "swish" ? (
            <div id="payment-swish-wrapper" className="payment-input-wrapper">
              <UncontrolledInputField
                inputId="payment-paying-phone-input"
                inputName="Phone number"
                inputType="tel"
                propName="payingPhoneNumber"
                defaultValue={paymentDetails.contactPhoneNumber}
                maxLength={10}
                isRequired={paymentDetails.paymentOption === "swish"}
                onInputChange={handleInputChange}
              />
            </div>
          ) : paymentDetails.paymentOption === "credit-card" ? (
            <div
              id="payment-credit-card-wrapper"
              className="payment-input-wrapper"
            >
              <div
                id="payment-card-number-wrapper"
                className="payment-input-wrapper"
              >
                <ControlledInputField
                  inputId="payment-card-number-input"
                  inputName="Card number"
                  inputType="text"
                  propName="cardNumber"
                  maxLength={16}
                  isRequired={paymentDetails.paymentOption === "credit-card"}
                  value={paymentDetails.cardNumber}
                  onInputChange={handleInputChange}
                ></ControlledInputField>
              </div>
              <div
                id="payment-credit-card-exp-date-wrapper"
                className="payment-input-wrapper"
              >
                <ControlledInputField
                  inputId="payment-card-expiration-input"
                  inputName="Expiration date"
                  inputType="month"
                  propName="expirationDate"
                  minValue={todaysYearAndMonth}
                  isRequired={paymentDetails.paymentOption === "credit-card"}
                  value={paymentDetails.expirationDate}
                  onInputChange={handleInputChange}
                ></ControlledInputField>
              </div>
              <div
                id="payment-credit-card-cvc-wrapper"
                className="payment-input-wrapper"
              >
                <ControlledInputField
                  inputId="payment-card-cvc-input"
                  inputName="CVC"
                  inputType="text"
                  propName="cvc"
                  maxLength={3}
                  isRequired={paymentDetails.paymentOption === "credit-card"}
                  value={paymentDetails.cvc}
                  onInputChange={handleInputChange}
                ></ControlledInputField>
              </div>
            </div>
          ) : (
            ""
          )}
          {authHandler.isAuthenticated && userInfoHasChanged ? (
            <div id="remember-changed-details-wrapper">
              <input
                type="checkbox"
                onChange={handleUserDetailsChange}
                checked={rememberUserDetails}
                id="payment-remember-me-cx"
              />
              <p> Save information for future orders</p>
            </div>
          ) : (
            ""
          )}
          <div id="pay-btn-wrapper">
            <button className="action-btn" type="submit">
              Pay $ {cartTotal}
            </button>
          </div>
        </form>
      ) : (
        <div id="payment-cart-empty-wrapper">
          <CartEmpty />
        </div>
      )}
      <>
        {postOrderHandler.error !== "" ? (
          <ErrorDialog
            errorText={postOrderHandler.error}
            action="sending order"
            url={postUrl}
          />
        ) : updateUserHandler.error !== "" ? (
          <ErrorDialog
            errorText={updateUserHandler.error}
            action="updating user details"
            url={updateUserUrl}
            infoText="Try paying without saving information for future orders"
          />
        ) : (
          ""
        )}
      </>
    </div>
  );
}

export default Payment;
