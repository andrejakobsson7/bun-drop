import React from "react";
function PageLabel(props) {
  return (
    <div className="page-label-container">
      <h1>{props.label}</h1>
    </div>
  );
}

export default PageLabel;
