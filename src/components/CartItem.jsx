import React, { useState, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import useSharedVariables from "../hooks/useSharedVariables";
function CartItem(props) {
  const [quantity, setQuantity] = useState(props.item.quantity);
  const [totalPrice, setTotalPrice] = useState(props.item.totalPrice);
  const [quantityOptions, setQuantityOptions] = useState([]);
  const localStorageHandler = useLocalStorage();
  const sharedVariablesHandler = useSharedVariables();

  useEffect(() => {
    let options = [];
    for (
      let i = sharedVariablesHandler.minimumQuantity;
      i <= sharedVariablesHandler.maximumQuantity;
      i++
    ) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    setQuantityOptions(options);
  }, []);

  async function handleQuantityChange(e) {
    const enteredQuantity = parseInt(e.target.value);
    setQuantity(enteredQuantity);
    const fixedTotalPrice = parseFloat(
      (enteredQuantity * props.item.price).toFixed(2)
    );
    setTotalPrice(fixedTotalPrice);
    const items = await localStorageHandler.getLocalStorage("cartItems");
    const itemToUpdateIndex = items.findIndex((i) => i.id === props.item.id);
    items[itemToUpdateIndex].quantity = enteredQuantity;
    items[itemToUpdateIndex].totalPrice = fixedTotalPrice;
    await localStorageHandler.setLocalStorage("cartItems", items);
    props.onQuantityChange();
  }
  return (
    <div className="cart-item-container">
      <div className="cart-item-image-wrapper">
        <img src={props.item.image} />
        <div className="cart-item-delete-wrapper-sm">
          <button className="remove-from-cart-btn" onClick={props.onItemDelete}>
            <p className="bi bi-trash3-fill"></p>
          </button>
        </div>
      </div>
      <div className="cart-item-info-wrapper">
        <div className="cart-item-name-wrapper">
          <h3>{props.item.title}</h3>
        </div>
        <div className="cart-item-quantity-wrapper">
          <label>Quantity</label>
          <select value={quantity} onChange={handleQuantityChange}>
            {quantityOptions}
          </select>
        </div>
        <div className="cart-item-price-wrapper">
          <label>Price</label>
          <p>$ {props.item.price}</p>
        </div>
        <div className="cart-item-total-price-wrapper">
          <label>Total</label>
          <p>$ {totalPrice}</p>
        </div>
        <div className="cart-item-delete-wrapper-lg">
          <button className="remove-from-cart-btn" onClick={props.onItemDelete}>
            <p className="bi bi-trash3-fill "></p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
