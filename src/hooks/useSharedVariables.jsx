import React from "react";
function useSharedVariables() {
  const minimumQuantity = 1;
  const maximumQuantity = 20;
  const supportEmail = "support@bundrop.com";
  return { minimumQuantity, maximumQuantity, supportEmail };
}

export default useSharedVariables;
