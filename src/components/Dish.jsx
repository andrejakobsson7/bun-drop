import React from "react";
function Dish(props) {
  return (
    <div className="dish-container">
      <div className="dish-image-wrapper">
        <img src={props.dish.image} />
      </div>
      <div className="dish-info-wrapper">
        <div className="dish-name">
          <em>{props.dish.title}</em>
        </div>
        <div className="dish-price">
          <em>$ {props.dish.price}</em>
        </div>
        <div className="dish-add-to-cart">
          <button className="add-to-cart-btn">
            <i className="bi bi-cart3"> Add to cart</i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dish;
