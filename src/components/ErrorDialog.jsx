import React, { useState } from "react";
import useSharedVariables from "../hooks/useSharedVariables";
import CloseDialogButton from "./CloseDialogButton";
import "../styles/components/ErrorDialog.css";
function ErrorDialog(props) {
  const sharedVariablesHandler = useSharedVariables();
  const [showDialog, setShowDialog] = useState(true);
  function handleDialogClose() {
    setShowDialog(false);
  }
  return (
    <>
      {showDialog ? (
        <dialog id="error-dialog" open>
          <div className="dialog-header">
            <h3 className="dialog-header-label">ERROR</h3>
            <CloseDialogButton onDialogClose={handleDialogClose} />
          </div>
          <h1 className="bi bi-bug-fill error"></h1>
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
          <p>{props.infoText}</p>
        </dialog>
      ) : (
        ""
      )}
    </>
  );
}

export default ErrorDialog;
