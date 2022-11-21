import React from "react";
import { Link } from "react-router-dom";
import style from "../styles/navBar.module.css";
import logo from "../images/logo.png";

const NavBar = () => {
  return (
    <nav className={style.navbar}>
      <img src={logo} alt="logo" className={style.logo} />
      <ul className={style.links}>
        <li className={style.item}>
          <Link to="/">View Properties</Link>
        </li>
        <li className={style.item}>
          <Link to="add-property">Add a Property</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
