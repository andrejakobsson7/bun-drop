import React, { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import useSharedVariables from "../hooks/useSharedVariables";
import useHelpers from "../hooks/useHelpers";
import "../styles/components/Dish.css";
function Dish(props) {
  const [dishClicked, setDishClicked] = useState(false);
  const [dishIsMaxedOut, setDishIsMaxedOut] = useState(false);
  const localStorageHandler = useLocalStorage();
  const sharedVariablesHandler = useSharedVariables();
  const helpers = useHelpers();

  useEffect(() => {
    if (props.cart !== null) {
      const dish = props.cart.find((i) => i.id === props.dish.id);
      if (dish !== undefined) {
        if (dish.quantity >= sharedVariablesHandler.maximumQuantity) {
          setDishIsMaxedOut(true);
        }
      }
    }
  }, []);

  async function handleAdd() {
    setDishClicked(true);
    let currentDish = props.dish;
    //Set quantity for dish to 1
    currentDish.quantity = 1;
    currentDish.totalPrice = helpers.calculateTotal(
      currentDish.quantity,
      props.dish.price
    ); //Get cart items from local storage
    const itemsInCart = await localStorageHandler.getLocalStorage("cartItems");
    //Check if cart is new (null) and create it if so.
    if (itemsInCart === null) {
      const cart = [];
      cart.push(currentDish);
      //Set item in local storage
      await localStorageHandler.setLocalStorage("cartItems", cart);
    }
    //If cart is not new, we need to check if the dish already exists in the cart to set the correct quantity.
    else {
      const foundItemIndex = itemsInCart.findIndex(
        (i) => i.id === currentDish.id
      );
      if (foundItemIndex === -1) {
        itemsInCart.push(currentDish);
      } else {
        //Check found item's quantity. Has it reached max?
        currentDish = itemsInCart[foundItemIndex];
        currentDish.quantity += 1;
        if (currentDish.quantity >= sharedVariablesHandler.maximumQuantity) {
          setDishIsMaxedOut(true);
        } else {
        }
        currentDish.totalPrice = helpers.calculateTotal(
          currentDish.quantity,
          props.dish.price
        );
      }
      await localStorageHandler.setLocalStorage("cartItems", itemsInCart);
    }
    setTimeout(function () {
      setDishClicked(false);
    }, 1500);
  }
  return (
    <div className="dish-container">
      <div className="dish-image-wrapper">
        <img src={props.dish.image} />
        <div className="add-to-favorites-wrapper">
          {props.favorite ? (
            <button
              className="favorite-btn"
              onClick={() => props.onFavoriteRemove(props.dish.id)}
            >
              <i className="bi bi-star-fill"></i> Favorite
            </button>
          ) : props.favorite === false ? (
            <button
              className="non-favorite-btn"
              onClick={() => props.onFavoriteAdd(props.dish)}
            >
              <i className="bi bi-star"></i> Add as favorite
            </button>
          ) : (
            props.favorite === null
          )}
        </div>
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
            className={`add-to-cart-btn ${dishClicked ? "confirm-click" : ""}${
              dishIsMaxedOut ? "dish-maxed-out" : ""
            }`}
            disabled={dishIsMaxedOut}
            onClick={handleAdd}
          >
            {" "}
            {dishClicked ? (
              <p className="bi bi-check-circle-fill"> Item added!</p>
            ) : dishIsMaxedOut ? (
              <p className="bi bi-x-circle-fill">
                {" "}
                Max qty is {sharedVariablesHandler.maximumQuantity}
              </p>
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
