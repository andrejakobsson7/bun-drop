import React, { useState } from "react";
import CloseDialogButton from "./CloseDialogButton";
import { Link } from "react-router-dom";
function SuccessDialog() {
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
          <strong>You are now officially a Bun Drop-user!</strong>
          <p>Our drones are ready to take your order and deliver it to you. </p>
          <p>Click the button below to go to sign in page.</p>
          <div>
            <Link to="/signin">
              <button className="success-go-to-sign-in-page-btn">
                Go to sign in page
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
