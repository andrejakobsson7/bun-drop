import React, { useEffect, useState } from "react";
import PageLabel from "../components/PageLabel";
import CartItem from "../components/CartItem";
import useLocalStorage from "../hooks/useLocalStorage";
import { Link } from "react-router-dom";
import "../styles//pages/Cart.css";
function Cart() {
  const [cart, setCart] = useState([]);
  const localStorageHandler = useLocalStorage();
  const [totalCartValue, setTotalCartValue] = useState(0);
  useEffect(() => {
    const getItemsInCart = async () => {
      const items = await localStorageHandler.getLocalStorage("cartItems");
      if (items !== null) {
        setCart(items);
      }
    };
    getItemsInCart();
  }, []);

  useEffect(() => {
    let cartTotal = 0;
    cart.forEach((i) => {
      cartTotal += parseFloat(i.totalPrice);
    });
    setTotalCartValue(cartTotal.toFixed(2));
  }, [cart]);

  async function handleQuantityChange() {
    const items = await localStorageHandler.getLocalStorage("cartItems");
    setCart(items);
  }
  async function handleItemDelete() {
    const items = await localStorageHandler.getLocalStorage("cartItems");
    setCart(items);
  }
  return (
    <div id="cart-container">
      <div id="cart-label-wrapper">
        <PageLabel label="CART" />
      </div>
      <>
        {cart.length > 0 ? (
          <div id="cart-items-wrapper">
            {cart.map((i) => (
              <CartItem
                key={i.id}
                item={i}
                onQuantityChange={handleQuantityChange}
                onItemDelete={handleItemDelete}
              />
            ))}
            <div id="cart-total-wrapper">
              <h3>
                Total $ <span className="cart-total">{totalCartValue}</span>
              </h3>
              <Link to="/payment">
                <button className="cart-continue-to-payment-btn">
                  Continue to payment
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div id="cart-cart-empty-wrapper">
            <p>Cart is empty</p>
            <Link to="/menu">
              <button className="cart-go-to-menu-btn">Go to menu</button>
            </Link>
          </div>
        )}
      </>
    </div>
  );
}

export default Cart;
