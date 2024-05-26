import React from "react";
import PageLabel from "../components/PageLabel";
import ErrorText from "../components/ErrorText";
import InputField from "../components/InputField";
function Payment() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log("Submitting...");
  }
  function validateInput(e) {
    console.log(e.target.value);
  }
  return (
    <div id="payment-container">
      <div id="payment-label-wrapper">
        <PageLabel label="PAYMENT"></PageLabel>
      </div>
      <form id="payment-form-wrapper" onSubmit={handleSubmit}>
        <div id="payment-contact-label" className="form-label">
          <h3>Contact</h3>
        </div>
        <div id="payment-first-name-wrapper" className="payment-input-wrapper">
          <InputField
            inputId="payment-first-name-input"
            inputName="First name"
            inputType="text"
          ></InputField>
          {/* <label>First name</label>
          <input type="text" onBlur={validateInput} />
          <ErrorText text="First name" /> */}
        </div>
        <div id="payment-last-name-wrapper" className="payment-input-wrapper">
          <label>Last name</label>
          <input type="text" />
          <ErrorText text="Last name" />
        </div>
        <div id="payment-email-wrapper" className="payment-input-wrapper">
          <label>Email</label>
          <input type="email" />
          <ErrorText text="Email" />
        </div>
        <div id="payment-phone-wrapper" className="payment-input-wrapper">
          <label>Phone number</label>
          <input type="text" />
          <ErrorText text="Phone number" />
        </div>

        <div id="payment-delivery-label" className="form-label">
          <h3>Delivery</h3>
        </div>
        <div id="payment-street-wrapper" className="payment-input-wrapper">
          <label>Street name</label>
          <input type="text" />
          <ErrorText text="Street name" />
        </div>
        <div
          id="payment-house-number-wrapper"
          className="payment-input-wrapper"
        >
          <label>House/apartment number</label>
          <input type="text" />
          <ErrorText text="House/apartment number" />
        </div>
        <div
          id="payment-postal-number-wrapper"
          className="payment-input-wrapper"
        >
          <label>Postal number</label>
          <input type="text" />
          <ErrorText text="Postal number" />
        </div>
        <div id="payment-city-wrapper" className="payment-input-wrapper">
          <label>City</label>
          <input type="text" />
          <ErrorText text="City" />
        </div>

        <div id="payment-payment-label" className="form-label">
          <h3>Payment</h3>
        </div>
        <div
          id="payment-payment-type-wrapper"
          className="payment-input-wrapper"
        >
          <label>Payment type</label>
          <select>
            <option value="" selected disabled hidden>
              Select payment type
            </option>
            <option value="swish">Swish</option>
            <option value="credit-card">Credit card</option>
          </select>
        </div>
        <div id="payment-swish-wrapper" className="payment-input-wrapper">
          <label>Phone number</label>
          <input type="text" />
          <ErrorText text="Phone number" />
        </div>
        <div id="payment-credit-card-wrapper" className="payment-input-wrapper">
          <div
            id="payment-card-number-wrapper"
            className="payment-input-wrapper"
          >
            <label>Card number</label>
            <input type="text" />
            <ErrorText text="Phone number" />
          </div>
          <div
            id="payment-credit-card-exp-date-wrapper"
            className="payment-input-wrapper"
          >
            <label>Expiration date</label>
            <input type="month" />
            <ErrorText text="Expiration date" />
          </div>
          <div
            id="payment-credit-card-cvc-wrapper"
            className="payment-input-wrapper"
          >
            <label>CVC</label>
            <input type="text" />
            <ErrorText text="CVC" />
          </div>
        </div>
        <div id="pay-btn-wrapper">
          <button className="payment-pay-btn" type="submit">
            Pay
          </button>
        </div>
      </form>
    </div>
  );
}

export default Payment;
