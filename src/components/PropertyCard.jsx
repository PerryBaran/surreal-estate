import React from "react";
import PropTypes from "prop-types";
import css from "../styles/propertyCard.module.css";
import { bath, bed, email as emailIcon } from "../media/icons";
import card from "../media/images/card.png";
import SaveProperty from "./SaveProperty";

const PropertyCard = ({
  _id,
  title,
  type,
  bathrooms,
  bedrooms,
  price,
  city,
  email,
  favouriteId,
  userId,
  onSaveProperty,
  onRemoveProperty,
}) => {
  return (
    <div className={css["property-card"]}>
      <img src={card} alt="property" className={css["property-card__image"]} />
      <h2>{title}</h2>
      <p>
        {type} - {city}
      </p>
      <div className={css["property-card__rooms"]}>
        <div className={css["property-card__rooms__room"]}>
          <img
            src={bath}
            alt="bathrooms"
            className={css["property-card__icon"]}
          />
          <p>{bathrooms}</p>
        </div>
        <div className={css["property-card__rooms__room"]}>
          <img
            src={bed}
            alt="bedrooms"
            className={css["property-card__icon"]}
          />
          <p>{bedrooms}</p>
        </div>
      </div>
      <p className={css["property-card__price"]}>
        £ {Number(price).toFixed(2)}
      </p>
      <a href={`mailto:${email}`} className={css["property-card__email"]}>
        <img
          src={emailIcon}
          alt="email"
          className={css["property-card__icon"]}
        />
        <p>Email</p>
      </a>
      <SaveProperty
        userId={userId}
        _id={_id}
        favouriteId={favouriteId}
        onSaveProperty={onSaveProperty}
        onRemoveProperty={onRemoveProperty}
      />
    </div>
  );
};

PropertyCard.defaultProps = {
  favouriteId: null,
};

PropertyCard.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  bathrooms: PropTypes.string.isRequired,
  bedrooms: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  onSaveProperty: PropTypes.func.isRequired,
  onRemoveProperty: PropTypes.func.isRequired,
  favouriteId: PropTypes.string,
};

export default PropertyCard;
