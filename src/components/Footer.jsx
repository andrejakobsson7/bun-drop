import React from "react";
import useSharedVariables from "../hooks/useSharedVariables";
import "../styles/components/Footer.css";
function Footer() {
  const { supportEmail } = useSharedVariables();
  return (
    <div id="footer-container">
      <div id="footer-copyright-wrapper">
        <p>© BunDrop ltd, 2024</p>
      </div>
    </div>
  );
}

export default Footer;
