import React from "react";
import "../styles/components/PageLabel.css";
function PageLabel(props) {
  return (
    <div className="page-label-container">
      <h1>{props.label.toUpperCase()}</h1>
    </div>
  );
}

export default PageLabel;
