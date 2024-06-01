import React from "react";
function CloseDialogButton(props) {
  return (
    <button onClick={props.onDialogClose} className="close-error-dialog-btn">
      <h3 className="bi bi-x-lg"></h3>
    </button>
  );
}

export default CloseDialogButton;
