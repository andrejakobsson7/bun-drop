import React from "react";
function Dish() {
  return (
    <div className="dish-container">
      <div className="dish-image-wrapper">
        <img src="images/burger-5.png" />
      </div>
      <div className="dish-info-wrapper">
        <div className="dish-name">
          <em>Classic cheeseburger</em>
        </div>
        <div className="dish-price">
          <em>79 SEK</em>
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
