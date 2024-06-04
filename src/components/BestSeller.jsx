import React from "react";
import "../styles/components/BestSeller.css";
function BestSeller(props) {
  return (
    <>
      <img src={props.dish.image} />
    </>
  );
}

export default BestSeller;
