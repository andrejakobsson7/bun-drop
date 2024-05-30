import React, { useState } from "react";
import useSharedVariables from "../hooks/useSharedVariables";
function Error(props) {
  const sharedVariablesHandler = useSharedVariables();
  const [showDialog, setShowDialog] = useState(true);
  function handleDialogClose() {
    setShowDialog(false);
  }
  return (
    <>
      {showDialog ? (
        <dialog id="error-dialog" open>
          <div id="error-dialog-header">
            <strong className="error-header-label error-text">ERROR</strong>
            <button
              onClick={handleDialogClose}
              className="close-error-dialog-btn"
            >
              <h3 className="bi bi-x-lg"></h3>
            </button>
          </div>
          <h1 className="bi bi-bug-fill"></h1>
          <p>Following error occured while {props.action}:</p>
          <strong>{props.errorText}</strong>
          <p>
            Please contact{" "}
            <a
              href={`mailto:${sharedVariablesHandler.supportEmail}?subject=Error ${props.action}&body=Hello,%0D%0AError message ${props.errorText} occured while ${props.action} at page: ${window.location.pathname}`}
            >
              {sharedVariablesHandler.supportEmail}
            </a>{" "}
            to resolve the issue.
          </p>
        </dialog>
      ) : (
        ""
      )}
    </>
  );
}

export default Error;
