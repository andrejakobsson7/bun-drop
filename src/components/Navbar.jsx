import React from "react";
import { Link, NavLink } from "react-router-dom";

import "bootstrap-icons/font/bootstrap-icons.css";

function Navbar() {
  return (
    <nav id="navbar-container">
      <div id="nav-logo-wrapper">
        <NavLink to="/">
          <img id="nav-logo-image" src="images\logo black.png" />
        </NavLink>
      </div>
      <div id="nav-links-wrapper">
        <ul id="nav-links">
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "active-link" : "inactive-link"
              }
              to="/signin"
            >
              <i className="bi bi-person-fill-lock"></i>
              <p>Sign in</p>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive ? "active-link" : "inactive-link"
              }
            >
              <i className="bi bi-person-fill-add"></i>
              <p>Register</p>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/menu"
              className={({ isActive }) =>
                isActive ? "active-link" : "inactive-link"
              }
            >
              <i className="bi bi-menu-button-wide"></i>
              <p>Menu</p>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? "active-link" : "inactive-link"
              }
            >
              <i className="bi bi-cart3"></i>
              <p>Cart</p>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
