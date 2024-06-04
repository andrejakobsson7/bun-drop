import React from "react";
import "../styles/components/ErrorText.css";
function ErrorText(props) {
  return (
    <p className="error-text">
      <small>{props.text}</small>
    </p>
  );
}

export default ErrorText;
