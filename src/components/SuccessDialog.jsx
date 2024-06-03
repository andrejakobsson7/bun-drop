import React, { useState } from "react";
import CloseDialogButton from "./CloseDialogButton";
import { Link } from "react-router-dom";
function SuccessDialog(props) {
  const [showDialog, setShowDialog] = useState(true);

  function handleDialogClose() {
    setShowDialog(false);
  }

  return (
    <>
      {showDialog ? (
        <dialog id="success-dialog" open>
          <div className="dialog-header">
            <h3 className="dialog-header-label">SUCCESS</h3>
            <CloseDialogButton onDialogClose={handleDialogClose} />
          </div>{" "}
          <h1 className="bi bi-check-circle-fill success"></h1>
          <strong>{props.confirmationText}</strong>
          <p>{props.upperInfoText}</p>
          <p>Click the button below to go to {props.navigationSuggestion}</p>
          <div>
            <Link to={props.navigationSuggestionUrl}>
              <button className="success-go-to-sign-in-page-btn">
                Go to {props.navigationSuggestion}
              </button>
            </Link>
          </div>
        </dialog>
      ) : (
        ""
      )}
    </>
  );
}

export default SuccessDialog;
