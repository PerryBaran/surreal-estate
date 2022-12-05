/* eslint-disable no-console */
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import useDidMountEffect from "../hooks/useDidMountEffect";
import css from "../styles/properties.module.css";
import getProperty from "../requests/getProperty";
import PropertyCard from "./PropertyCard";
import Alert from "./Alert";
import SideBar from "./SideBar";
import postFavourite from "../requests/postFavourite";
import deleteFavourite from "../requests/deleteFavourte";

const Properties = ({ options, userId }) => {
  const [properties, setProperties] = useState([]);
  const [alert, setAlert] = useState("");
  const [filterByFavourites, setFilterByFavourties] = useState(false);
  const { search } = useLocation();

  useDidMountEffect(() => {
    getProperty(setProperties, setAlert, search, userId);
  }, [search, userId]);

  const handleSaveProperty = async (propertyId) => {
    const propertyInfo = {
      propertyListing: propertyId,
      fbUserId: userId,
    };

    await postFavourite(propertyInfo, setAlert);
    getProperty(setProperties, setAlert, search, userId);
  };

  const handleRemoveFavourite = async (favouriteId) => {
    await deleteFavourite(favouriteId, setAlert);
    getProperty(setProperties, setAlert, search, userId);
  };

  const handleFilterFavourites = (value) => {
    if (value !== undefined) {
      setFilterByFavourties(value);
    } else {
      setFilterByFavourties((prev) => !prev);
    }
  };

  return (
    <div className={css.properties}>
      <SideBar
        cities={options.cities}
        types={options.types}
        filterByFavourites={filterByFavourites}
        handleFilterFavourites={handleFilterFavourites}
        userId={userId}
      />
      <div className={css.properties__main}>
        <Alert message={alert} />
        <div className={css.properties__cards}>
          {properties.map((property) => {
            if (
              !filterByFavourites ||
              (filterByFavourites && property.favouriteId)
            ) {
              return (
                <PropertyCard
                  key={property._id}
                  {...property}
                  userId={userId}
                  onSaveProperty={handleSaveProperty}
                  onRemoveProperty={handleRemoveFavourite}
                />
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

Properties.propTypes = {
  options: PropTypes.shape({
    cities: PropTypes.arrayOf(PropTypes.string),
    types: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  userId: PropTypes.string.isRequired,
};

export default Properties;
