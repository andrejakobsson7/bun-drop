import React, { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
function Dish(props) {
  const [dishClicked, setDishClicked] = useState(false);
  const localStorageHandler = useLocalStorage();
  // async function handleAdd() {
  //   //Get cart items from local storage
  //   const itemsInCart = await localStorageHandler.getLocalStorage("cartItems");
  //   //Check if cart is new (null) and create it if so.
  //   if (itemsInCart === null) {
  //     const cart = [];
  //     props.dish.quantity = 1;
  //     cart.push(props.dish);
  //     //Set item in local storage
  //     await localStorageHandler.setLocalStorage("cartItems", cart);
  //   }
  //   //If cart is not new, we need to check if the dish already exists in the cart to set the correct quantity.
  //   else {
  //     const foundItemIndex = itemsInCart.findIndex(
  //       (i) => i.id === props.dish.id
  //     );
  //     if (foundItemIndex === -1) {
  //       props.dish.quantity = 1;
  //       itemsInCart.push(props.dish);
  //     } else {
  //       itemsInCart[foundItemIndex].quantity += 1;
  //     }
  //     await localStorageHandler.setLocalStorage("cartItems", itemsInCart);
  //   }
  // }
  function handleAdd() {
    setDishClicked(true);
    props.onCartAdd(props.dish);
    setTimeout(function () {
      setDishClicked(false);
    }, 2000);
  }
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
          <button
            className={`add-to-cart-btn ${dishClicked ? "confirm-click" : ""}`}
            onClick={handleAdd}
          >
            {" "}
            {dishClicked ? (
              <p className="bi bi-check-circle-fill"> Item added!</p>
            ) : (
              <p className="bi bi-cart3"> Add to cart</p>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dish;
