import React, { useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import qs from "qs";
import css from "../styles/sideBar.module.css";
import { search as searchIcon } from "../media/icons";

const SideBar = ({
  cities,
  types,
  userId,
  filterByFavourites,
  handleFilterFavourites,
}) => {
  const queryRef = useRef();
  const navigate = useNavigate();
  const { search } = useLocation();

  const highlightItem = (value) => {
    const searchArray = search.split(/[%2:}]+/);
    return searchArray.includes(value) ? css["side-bar__highlight"] : null;
  };

  const buildQueryString = (operation, key, value) => {
    const currentQueryParams = qs.parse(search, { ignoreQueryPrefix: true });
    const currentOperationObj = JSON.parse(
      currentQueryParams[operation] || "{}"
    );

    if (currentOperationObj[key] && currentOperationObj[key] === value) {
      delete currentOperationObj[key];
    } else {
      currentOperationObj[key] = value;
    }

    const newQueryParams = {
      ...currentQueryParams,
      [operation]: JSON.stringify(currentOperationObj),
    };

    return qs.stringify(newQueryParams, {
      addQueryPrefix: true,
      encode: false,
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const { value } = queryRef.current;

    const newQueryString = buildQueryString("query", "title", {
      $regex: value,
    });

    navigate(newQueryString);
  };

  const handleReset = () => {
    handleFilterFavourites(false);
    queryRef.current.value = "";
    navigate("/");
  };

  return (
    <div className={css["side-bar"]}>
      {userId && (
        <label htmlFor="favourites" className={css["side-bar__favourites"]}>
          <h2 className={css["side-bar__heading"]}>Filter By Favourites</h2>
          <input
            type="checkbox"
            id="favourites"
            checked={filterByFavourites}
            onChange={() => handleFilterFavourites()}
          />
        </label>
      )}
      <h2 className={css["side-bar__heading"]}>Filter By City</h2>
      <ul>
        {cities.map((city) => {
          return (
            <li key={city}>
              <Link
                to={buildQueryString("query", "city", city)}
                className={`${css["side-bar__link"]} ${highlightItem(city)}`}
              >
                {city}
              </Link>
            </li>
          );
        })}
      </ul>
      <h2 className={css["side-bar__heading"]}>Filter By Type</h2>
      <ul>
        {types.map((type) => {
          return (
            <li key={type}>
              <Link
                to={buildQueryString("query", "type", type)}
                className={`${css["side-bar__link"]} ${highlightItem(type)}`}
              >
                {type}
              </Link>
            </li>
          );
        })}
      </ul>
      <h2 className={css["side-bar__heading"]}>Sort By Price</h2>
      <ul>
        <li>
          <Link
            to={buildQueryString("sort", "price", -1)}
            className={`${css["side-bar__link"]} ${highlightItem("-1")}`}
          >
            Ascending
          </Link>
        </li>
        <li>
          <Link
            to={buildQueryString("sort", "price", 1)}
            className={`${css["side-bar__link"]} ${highlightItem("1")}`}
          >
            Descending
          </Link>
        </li>
      </ul>
      <h2 className={css["side-bar__heading"]}>Search by Title</h2>
      <div className={css["side-bar__search"]}>
        <input
          id="query"
          ref={queryRef}
          className={css["side-bar__search__input"]}
        />
        <button
          type="submit"
          className={css["side-bar__search__submit"]}
          onClick={handleSearch}
        >
          <img alt="search" src={searchIcon} />
        </button>
      </div>
      <button
        type="button"
        onClick={handleReset}
        className={css["side-bar__reset"]}
      >
        Reset
      </button>
    </div>
  );
};

SideBar.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  types: PropTypes.arrayOf(PropTypes.string).isRequired,
  filterByFavourites: PropTypes.bool.isRequired,
  handleFilterFavourites: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

export default SideBar;
