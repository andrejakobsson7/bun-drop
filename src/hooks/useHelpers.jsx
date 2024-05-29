import React from "react";
function useHelpers() {
  function calculateTotal(quantity, price) {
    return parseFloat((quantity * price).toFixed(2));
  }
  return { calculateTotal };
}

export default useHelpers;
