import React, { useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import qs from "qs";
import style from "../styles/sideBar.module.css";
import { search as searchIcon } from "../media/icons";

const SideBar = ({
  cities,
  userId,
  filterByFavourites,
  handleFilterFavourites,
}) => {
  const queryRef = useRef();
  const navigate = useNavigate();
  const { search } = useLocation();

  const buildQueryString = (operation, valueObj) => {
    const currentQueryParams = qs.parse(search, { ignoreQueryPrefix: true });

    const newQueryParams = {
      ...currentQueryParams,
      [operation]: JSON.stringify({
        ...JSON.parse(currentQueryParams[operation] || "{}"),
        ...valueObj,
      }),
    };

    return qs.stringify(newQueryParams, {
      addQueryPrefix: true,
      encode: false,
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const { value } = queryRef.current;

    const newQueryString = buildQueryString("query", {
      title: { $regex: value },
    });

    navigate(newQueryString);
  };

  return (
    <div className={style["side-bar"]}>
      {userId && (
        <label htmlFor="favourites" className={style["side-bar-favourites"]}>
          <h2 className={style["side-bar-heading"]}>Filter By Favourites</h2>
          <input
            type="checkbox"
            id="favourites"
            checked={filterByFavourites}
            onChange={handleFilterFavourites}
          />
        </label>
      )}
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
      <h2 className={style["side-bar-heading"]}>Search by Title</h2>
      <form onSubmit={handleSearch} className={style["side-bar-search-form"]}>
        <div className={style["side-bar-search"]}>
          <label htmlFor="query">
            <input
              id="query"
              ref={queryRef}
              className={style["side-bar-search-input"]}
            />
          </label>
          <button type="submit" className={style["side-bar-search-submit"]}>
            <img alt="search" src={searchIcon} />
          </button>
        </div>
      </form>
    </div>
  );
};

SideBar.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  filterByFavourites: PropTypes.bool.isRequired,
  handleFilterFavourites: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

export default SideBar;
