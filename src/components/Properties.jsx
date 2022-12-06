/* eslint-disable no-console */
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import useDidMountEffect from "../hooks/useDidMountEffect";
import css from "../styles/properties.module.css";
import getProperties from "../requests/getProperties";
import PropertyCard from "./PropertyCard";
import Alert from "./Alert";
import SideBar from "./SideBar";
import Loader from "./Loader";
import postFavourite from "../requests/postFavourite";
import deleteFavourite from "../requests/deleteFavourte";

const Properties = ({ options, userId }) => {
  const [properties, setProperties] = useState([]);
  const [alert, setAlert] = useState("");
  const [filterByFavourites, setFilterByFavourties] = useState(false);
  const [loading, setLoading] = useState(false);
  const { search } = useLocation();

  useDidMountEffect(() => {
    (async () => {
      setLoading(true);
      setAlert("");
      try {
        await getProperties(setProperties, search, userId);
      } catch ({ message }) {
        setAlert(message);
      } finally {
        setLoading(false);
      }
    })();
  }, [search, userId]);

  const handleSaveProperty = async (propertyId) => {
    const propertyInfo = {
      propertyListing: propertyId,
      fbUserId: userId,
    };

    setLoading(true);
    setAlert("");
    try {
      await postFavourite(propertyInfo);
      await getProperties(setProperties, search, userId);
    } catch ({ message }) {
      setAlert(message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavourite = async (favouriteId) => {
    setLoading(true);
    setAlert("");
    try {
      await deleteFavourite(favouriteId);
      await getProperties(setProperties, search, userId);
    } catch ({ message }) {
      setAlert(message);
    } finally {
      setLoading(false);
    }
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
        <div className={loading || alert ? css.properties__main__alert : null}>
          <Loader loading={loading} size={50} />
          <Alert message={alert} />
        </div>
        <div className={css.properties__main__cards}>
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
