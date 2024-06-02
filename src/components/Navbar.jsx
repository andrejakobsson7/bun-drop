import React, { useEffect, useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import { AuthContext } from "../contexts/AuthProvider";

import "bootstrap-icons/font/bootstrap-icons.css";

function Navbar() {
  const localStorageHandler = useLocalStorage();
  const authHandler = useContext(AuthContext);

  return (
    <nav id="navbar-container">
      <div id="nav-logo-wrapper">
        <NavLink to="/">
          <img id="nav-logo-image" src="images\logo black.png" />
        </NavLink>
      </div>
      <div id="nav-links-wrapper">
        <ul id="nav-links">
          {authHandler.isAuthenticated === false ? (
            <>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active-link" : "inactive-link"
                  }
                  to="/signin"
                >
                  <p className="bi bi-door-open-fill"></p> <p>Sign in</p>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive ? "active-link" : "inactive-link"
                  }
                >
                  <p className="bi bi-person-fill-add"></p>
                  <p>Register</p>
                </NavLink>
              </li>
            </>
          ) : (
            <div className="navbar-user-dropdown-select">
              <a>
                <div className="navbar-user-icon">
                  <p className="bi bi-person-fill user-icon"></p>
                </div>
                <p>
                  User <span className="bi bi-caret-down-fill"></span>
                </p>
              </a>

              <div className="navbar-user-dropdown-content">
                <div className="navbar-dropdown-link-wrapper">
                  <NavLink to="/register" className="navbar-dropdown-link">
                    <p className="bi bi-gear-fill">
                      <span> Settings</span>
                    </p>
                  </NavLink>
                </div>

                <hr />
                <div className="navbar-dropdown-link-wrapper">
                  <a
                    onClick={authHandler.signOut}
                    className="navbar-dropdown-link"
                  >
                    <p className="bi bi-door-closed-fill">
                      <span> Sign out</span>
                    </p>
                  </a>
                </div>
              </div>
            </div>
          )}
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
