import React from "react";
import { Link, useLocation } from "react-router-dom";
import qs from "qs";
import style from "../styles/sideBar.module.css";
import cities from "../data/cities";

const SideBar = () => {
  const buildQueryString = (operation, valueObj) => {
    const { search } = useLocation();
    const currentQueryParams = qs.parse(search, { ignoreQueryPrefix: true });

    const newQueryParams = {
      ...currentQueryParams,
      [operation]: JSON.stringify(valueObj),
    };

    return qs.stringify(newQueryParams, {
      addQueryPrefix: true,
      encode: false,
    });
  };

  return (
    <div className={style["side-bar"]}>
      <h2 className={style["side-bar-heading"]}>Filter By City</h2>
      <ul className={style["side-bar-list"]}>
        {cities.map((city) => {
          return (
            <li className={style["side-bar-item"]} key={city}>
              <Link
                to={buildQueryString("query", { city })}
                className={style["side-bar-link"]}
              >
                {city}
              </Link>
            </li>
          );
        })}
      </ul>
      <h2 className={style["side-bar-heading"]}>Sort By Price</h2>
      <ul className={style["side-bar-list"]}>
        <li className={style["side-bar-item"]}>
          <Link
            to={buildQueryString("sort", { price: -1 })}
            className={style["side-bar-link"]}
          >
            Ascending
          </Link>
        </li>
        <li className={style["side-bar-item"]}>
          <Link
            to={buildQueryString("sort", { price: 1 })}
            className={style["side-bar-link"]}
          >
            Descending
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
