import React from "react";
import PageLabel from "../components/PageLabel";
import CartItem from "../components/CartItem";
function Cart() {
  return (
    <div id="cart-container">
      <div id="cart-label-wrapper">
        <PageLabel label="CART" />
      </div>
      <div id="cart-items-wrapper">
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <div id="cart-total-wrapper">
          <h3>
            Total <span className="cart-total">79</span> SEK
          </h3>
          <button className="cart-continue-to-payment-btn">
            Continue to payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
