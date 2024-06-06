import React from "react";
import { Link } from "react-router-dom";
import "../styles/components/CartEmpty.css";
function CartEmpty() {
  return (
    <>
      <p>Cart is empty</p>
      <Link to="/menu">
        <button className="cart-empty-go-to-menu-btn">Go to menu</button>
      </Link>
    </>
  );
}

export default CartEmpty;
