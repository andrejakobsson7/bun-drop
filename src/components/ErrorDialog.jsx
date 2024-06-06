import React, { useState } from "react";
import useSharedVariables from "../hooks/useSharedVariables";
import CloseDialogButton from "./CloseDialogButton";
import { Link } from "react-router-dom";
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
          {props.action !== undefined ? (
            <p>Following error occured while {props.action}:</p>
          ) : (
            <p>The page you requested does not exist.</p>
          )}
          <strong>{props.errorText}</strong>
          {props.action !== undefined ? (
            <p>
              Please contact{" "}
              <a
                href={`mailto:${sharedVariablesHandler.supportEmail}?subject=Error ${props.action}&body=Hello,%0D%0AError message ${props.errorText} occured while ${props.action} at page: ${window.location.pathname}`}
              >
                {sharedVariablesHandler.supportEmail}
              </a>{" "}
              to resolve the issue.
            </p>
          ) : (
            ""
          )}
          <p>{props.infoText}</p>
          {props.action !== undefined ? (
            ""
          ) : (
            <Link to="/">
              <button className="error-go-to-home-btn">Go to home page</button>
            </Link>
          )}
        </dialog>
      ) : (
        ""
      )}
    </>
  );
}

export default ErrorDialog;
