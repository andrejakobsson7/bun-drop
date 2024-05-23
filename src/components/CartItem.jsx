import React from "react";
function CartItem() {
  return (
    <div className="cart-item-container">
      <div className="cart-item-image-wrapper">
        <img src="images/burger-5.png" />
        <div className="cart-item-delete-wrapper-sm">
          <button className="remove-from-cart-btn">
            <i className="bi bi-trash3-fill"></i>
          </button>
        </div>
      </div>
      <div className="cart-item-info-wrapper">
        <div className="cart-item-name-wrapper">
          <h3>Classic cheeseburger</h3>
        </div>
        <div className="cart-item-quantity-wrapper">
          <label>Quantity</label>
          <input className="cart-item-quantity-input" type="number" />
        </div>
        <div className="cart-item-price-wrapper">
          <label>Price</label>
          <p>79 SEK</p>
        </div>
        <div className="cart-item-total-price-wrapper">
          <label>Total</label>
          <p>79 SEK</p>
        </div>
        <div className="cart-item-delete-wrapper-lg">
          <button className="remove-from-cart-btn">
            <i className="bi bi-trash3-fill "></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
