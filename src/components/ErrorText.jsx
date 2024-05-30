import React from "react";
function ErrorText(props) {
  return (
    <p className="error-text">
      <small>{props.text}</small>
    </p>
  );
}

export default ErrorText;
