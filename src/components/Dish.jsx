import React from "react";
function Dish(props) {
  return (
    <div className="dish-container">
      <div className="dish-image-wrapper">
        <img src={props.dish.image} />
      </div>
      <div className="dish-info-wrapper">
        <div className="dish-name">
          <h3>{props.dish.title}</h3>
        </div>
        <div className="dish-price">
          <strong>$ {props.dish.price}</strong>
        </div>
        <div className="dish-add-to-cart">
          <button className="add-to-cart-btn">
            <p className="bi bi-cart3"> Add to cart</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dish;
