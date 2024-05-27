import React from "react";
function BestSeller(props) {
  return (
    <div className="best-seller">
      <img src={props.dish.image} />
    </div>
  );
}

export default BestSeller;
