import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import style from "../styles/navBar.module.css";
import logo from "../media/images/logo.png";
import Login from "./Login";
import Logout from "./Logout";

const NavBar = ({ handleLogin, handleLogout, userId }) => {
  return (
    <div className={style["navbar-container"]}>
      <img src={logo} alt="Surreal Estate" className={style.logo} />
      <nav className={style.navbar}>
        <ul className={style.links}>
          <li className={style.item}>
            <NavLink to="/">View Properties</NavLink>
          </li>
          <li className={style.item}>
            <NavLink to="add-property">Add a Property</NavLink>
          </li>
        </ul>
      </nav>
      <div className={style.login}>
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
