function useCart() {
  function calculateCartTotal(cart) {
    let cartTotal = 0;
    cart.forEach((i) => {
      cartTotal += parseFloat(i.totalPrice);
    });
    return cartTotal.toFixed(2);
  }
  return { calculateCartTotal };
}

export default useCart;
