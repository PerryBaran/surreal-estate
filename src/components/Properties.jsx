import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import useDidMountEffect from "../hooks/useDidMountEffect";
import style from "../styles/properties.module.css";
import getProperty from "../requests/getProperty";
import PropertyCard from "./PropertyCard";
import Alert from "./Alert";
import SideBar from "./SideBar";
import postFavourite from "../requests/postFavourite";

const Properties = ({ cities, userId }) => {
  const [properties, setProperties] = useState([]);
  const [alert, setAlert] = useState("");
  const { search } = useLocation();

  useDidMountEffect(() => {
    getProperty(setProperties, setAlert, search);
  }, [search]);

  const handleSaveProperty = (propertyId) => {
    const propertyInfo = {
      propertyListing: propertyId,
      fbUserId: userId,
    };

    postFavourite(propertyInfo);
  };

  return (
    <div className={style.properties}>
      <SideBar cities={cities} />
      <div className={style["properties-main"]}>
        <Alert message={alert} />
        <div className={style["properties-array"]}>
          {properties.map((property) => {
            return (
              <PropertyCard
                key={property._id}
                {...property}
                userId={userId}
                onSaveProperty={handleSaveProperty}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

Properties.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  userId: PropTypes.string.isRequired,
};

export default Properties;
