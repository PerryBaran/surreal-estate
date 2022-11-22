import React from "react";
import PropTypes from "prop-types";
import style from "../styles/propertyCard.module.css";
import { bath, bed, email as emailIcon } from "../media/icons";
import card from "../media/images/card.png";

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
      <img src={card} alt="property" className={style["property-card-image"]} />
      <h2 className={style["property-card-title"]}>{title}</h2>
      <p className={style["property-card-info"]}>
        {type} - {city}
      </p>
      <div className={style["property-card-rooms"]}>
        <div className={style["property-card-room"]}>
          <img
            src={bath}
            alt="bathrooms"
            className={style["property-card-icon"]}
          />
          <p>{bathrooms}</p>
        </div>
        <div className={style["property-card-room"]}>
          <img
            src={bed}
            alt="bedrooms"
            className={style["property-card-icon"]}
          />
          <p>{bedrooms}</p>
        </div>
      </div>
      <p className={style["property-card-price"]}>
        £ {Number(price).toFixed(2)}
      </p>
      <a href={`mailto:${email}`} className={style["property-card-email"]}>
        <img
          src={emailIcon}
          alt="email"
          className={style["property-card-icon"]}
        />
        <p>Email</p>
      </a>
    </div>
  );
};

PropertyCard.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  bathrooms: PropTypes.string.isRequired,
  bedrooms: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default PropertyCard;