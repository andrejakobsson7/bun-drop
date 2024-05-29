import React from "react";
function useSharedVariables() {
  const minimumQuantity = 1;
  const maximumQuantity = 20;
  return { minimumQuantity, maximumQuantity };
}

export default useSharedVariables;
