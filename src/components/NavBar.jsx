import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import css from "../styles/navBar.module.css";
import logo from "../media/images/logo.png";
import Login from "./Login";
import Logout from "./Logout";

const NavBar = ({ handleLogin, handleLogout, userId }) => {
  return (
    <div className={css["nav-bar"]}>
      <img src={logo} alt="Surreal Estate" className={css["nav-bar__logo"]} />
      <nav className={css["nav-bar__nav"]}>
        <ul className={css["nav-bar__list"]}>
          <li className={css["nav-bar__item"]}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? css["nav-bar__link--active"] : null
              }
            >
              View Properties
            </NavLink>
          </li>
          <li className={css["nav-bar__item"]}>
            <NavLink
              to="add-property"
              className={({ isActive }) =>
                isActive ? css["nav-bar__link--active"] : null
              }
            >
              Add a Property
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={css["nav-bar__login"]}>
        {userId ? (
          <Logout onSuccess={handleLogout} />
        ) : (
          <Login onSuccess={handleLogin} />
        )}
      </div>
    </div>
  );
};

NavBar.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

export default NavBar;
