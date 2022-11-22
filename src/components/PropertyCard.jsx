import React from "react";
import PropTypes from "prop-types";
import style from "../styles/propertyCard.module.css";
import { bath, bed, email as emailIcon } from "../media/icons";

const PropertyCard = ({
  title,
  type,
  bathrooms,
  bedrooms,
  price,
  city,
  email,
}) => {
  return (
    <div className={style["property-card"]}>
      <h2 className={style["property-card-title"]}>{title}</h2>
      <p className={style["property-card-info"]}>
        {type} - {city}
      </p>
      <div className={style["property-card-rooms"]}>
        <div className={style["property-card-room"]}>
          <img src={bath} alt="bathrooms" />
          <p>{bathrooms}</p>
        </div>
        <div className={style["property-card-room"]}>
          <img src={bed} alt="bedrooms" />
          <p>{bedrooms}</p>
        </div>
      </div>
      <p className={style["property-card-price"]}>£ {price.toFixed(2)}</p>
      <a href={`mailto:${email}`} className={style["property-card-email"]}>
        <img src={emailIcon} alt="email" />
        <p>Email</p>
      </a>
    </div>
  );
};

PropertyCard.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  bathrooms: PropTypes.number.isRequired,
  bedrooms: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default PropertyCard;
