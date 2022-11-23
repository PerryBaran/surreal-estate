import React from "react";
import { Link } from "react-router-dom";
import style from "../styles/sideBar.module.css";
import cities from "../data/cities";

const SideBar = () => {
  return (
    <ul className={style["side-bar"]}>
      {cities.map((city) => {
        return (
          <li className={style["side-bar-item"]} key={city}>
            <Link
              to={`/?query={"city":"${city}"}`}
              className={style["side-bar-link"]}
            >
              {city}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SideBar;
