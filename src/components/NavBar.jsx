import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import style from "../styles/navBar.module.css";
import logo from "../media/images/logo.png";
import Login from "./Login";
import Logout from "./Logout";

const NavBar = ({ handleLogin, handleLogout, userId }) => {
  return (
    <div className={style["navbar-container"]}>
      <nav className={style.navbar}>
        <img src={logo} alt="Surreal Estate" className={style.logo} />
        <ul className={style.links}>
          <li className={style.item}>
            <Link to="/">View Properties</Link>
          </li>
          <li className={style.item}>
            <Link to="add-property">Add a Property</Link>
          </li>
        </ul>
      </nav>
      <div className={style["google-login"]}>
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
