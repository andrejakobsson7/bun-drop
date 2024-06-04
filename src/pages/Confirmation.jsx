import React, { useState, useEffect } from "react";
import PageLabel from "../components/PageLabel";
import { Link } from "react-router-dom";
import "../styles/pages/Confirmation.css";
function Confirmation() {
  const [randomDeliveryTime, setRandomDeliveryTime] = useState(0);
  const maximumDeliveryTime = 60;
  const minimumDeliveryTime = 5;

  function calculateRandomDeliveryTime() {
    return Math.floor(
      Math.random() * (maximumDeliveryTime - minimumDeliveryTime) +
        minimumDeliveryTime
    );
  }

  useEffect(() => {
    const randomGeneratedDeliveryTime = calculateRandomDeliveryTime();
    setRandomDeliveryTime(randomGeneratedDeliveryTime);
  }, []);

  return (
    <div id="confirmation-container">
      <div id="confirmation-label-wrapper">
        <PageLabel label="CONFIRMATION"></PageLabel>
      </div>
      <div id="confirmation-text-wrapper">
        <h2>Great success!</h2>
        <h3>
          Your order has been confirmed and will be delivered to you in{" "}
          {randomDeliveryTime} minutes.
        </h3>
      </div>
      <div id="confirmation-image-wrapper"></div>
      <div id="confirmation-return-home-wrapper">
        <Link to="/">
          <button className="confirmation-return-home-btn">
            Return to home page
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Confirmation;
