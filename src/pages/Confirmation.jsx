import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PageLabel from "../components/PageLabel";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import "../styles/pages/Confirmation.css";
import CartItem from "../components/CartItem";
import useCart from "../hooks/useCart";
function Confirmation() {
  const [randomDeliveryTime, setRandomDeliveryTime] = useState(0);
  const maximumDeliveryTime = 60;
  const minimumDeliveryTime = 5;
  const { orderId } = useParams();
  const fetchOrder = useFetch(`http://localhost:9999/orders/${orderId}`);
  const [orderDishes, setOrderDishes] = useState([]);
  const cartHandler = useCart();

  function calculateRandomDeliveryTime() {
    return Math.floor(
      Math.random() * (maximumDeliveryTime - minimumDeliveryTime) +
        minimumDeliveryTime
    );
  }

  useEffect(() => {
    if (fetchOrder.data !== null) {
      setOrderDishes(fetchOrder.data.dishes);
    }
  }, [fetchOrder.data]);
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
          Your order <u>{orderId}</u> has been confirmed and will be delivered
          to you in {randomDeliveryTime} minutes.
        </h3>
      </div>

      <div id="confirmation-wrapper">
        <div id="confirmation-order-label-wrapper">
          <h3>Order summary</h3>
        </div>

        <div id="confirmation-items-wrapper">
          {fetchOrder.loading ? (
            <p>Loading order...</p>
          ) : fetchOrder.error ? (
            <p>Error</p>
          ) : orderDishes.length > 0 ? (
            <>
              {orderDishes.map((d) => (
                <CartItem key={d.id} item={d} />
              ))}
              <div id="confirmation-order-details-wrapper">
                <div>
                  <strong>Order</strong>
                  <p>Ordernumber: {fetchOrder.data.id}</p>
                  <p>Order time: {fetchOrder.data.orderTime}</p>
                  <p>
                    Ordered by: {fetchOrder.data.user.firstName}{" "}
                    {fetchOrder.data.user.lastName}
                  </p>
                </div>
                <div>
                  <strong>
                    {" "}
                    <strong>Delivery </strong>
                  </strong>
                  <p>
                    {fetchOrder.data.user.streetName}{" "}
                    {fetchOrder.data.user.houseNumber},{" "}
                    {fetchOrder.data.user.city} <br />
                  </p>
                </div>
                <div>
                  <strong>Payment</strong>
                  <p>
                    {" "}
                    Payed ${" "}
                    {cartHandler.calculateCartTotal(
                      fetchOrder.data.dishes
                    )} via {fetchOrder.data.user.paymentOption}
                  </p>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
          <div id="confirmation-return-home-wrapper">
            <Link to="/">
              <button className="confirmation-return-home-btn">
                Return to home page
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;
