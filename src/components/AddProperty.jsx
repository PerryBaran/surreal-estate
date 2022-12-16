import React, { useState } from "react";
import PropTypes from "prop-types";
import css from "../styles/addProperty.module.css";
import postProperty from "../requests/postProperty";
import Alert from "./Alert";
import Loader from "./Loader";

const AddProperty = ({ cities, types }) => {
  const EMAIL_REGEX = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  const initialState = {
    form: {
      title: "",
      type: types[0],
      bedrooms: 0,
      bathrooms: 0,
      price: 0,
      city: cities[0],
      email: "",
    },
    alert: {
      message: "",
      isSuccessful: true,
    },
  };
  const [formFields, setFormFields] = useState(initialState.form);
  const [alert, setAlert] = useState(initialState.alert);
  const [loading, setLoading] = useState(false);

  const handleAddProperty = async (e) => {
    e.preventDefault();
    setAlert(initialState.alert);
    if (!formFields.title) {
      setAlert({
        message: "Please provide a valid title.",
        isSuccessful: false,
      });
    } else if (!formFields.price) {
      setAlert({
        message: "Price must be more than 0.",
        isSuccessful: false,
      });
    } else if (!formFields.email.match(EMAIL_REGEX)) {
      setAlert({
        message: "Please provide a valid email.",
        isSuccessful: false,
      });
    } else {
      setLoading(true);
      try {
        await postProperty(formFields);
        setAlert({
          message: "Property added.",
          isSuccessful: true,
        });
        setFormFields(initialState.form);
      } catch ({ message }) {
        setAlert({
          message,
          isSuccessful: false,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleFieldChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const handlePriceChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    const currencyRegex = /[0-9]*[.]{0,1}[0-9]{0,2}/s;
    const valueAsCurrency = Number(value.match(currencyRegex)[0]);

    setFormFields({
      ...formFields,
      [name]: valueAsCurrency,
    });
  };

  return (
    <div className={css["add-property"]}>
      <form
        onSubmit={handleAddProperty}
        className={css["add-property__form"]}
        aria-label="form"
      >
        <Loader loading={loading} size={20} />
        <Alert message={alert.message} success={alert.isSuccessful} />
        <label htmlFor="title" className={css["add-property__label"]}>
          <span>Title</span>
          <input
            id="title"
            name="title"
            value={formFields.title}
            onChange={handleFieldChange}
            placeholder="2 bed flat"
            className={css["add-property__input"]}
            required
          />
        </label>
        <label htmlFor="type" className={css["add-property__label"]}>
          <span>Type</span>
          <select
            id="type"
            name="type"
            value={formFields.type}
            onChange={handleFieldChange}
            className={css["add-property__select"]}
          >
            {types.map((type) => {
              return (
                <option value={type} key={type}>
                  {type}
                </option>
              );
            })}
          </select>
        </label>
        <label htmlFor="bedrooms" className={css["add-property__label"]}>
          <span>Bedrooms</span>
          <input
            type="number"
            id="bedrooms"
            name="bedrooms"
            value={formFields.bedrooms}
            min={0}
            onChange={handleFieldChange}
            className={css["add-property__input"]}
          />
        </label>
        <label htmlFor="bathrooms" className={css["add-property__label"]}>
          <span>Bathrooms</span>
          <input
            type="number"
            id="bathrooms"
            name="bathrooms"
            value={formFields.bathrooms}
            min={0}
            onChange={handleFieldChange}
            className={css["add-property__input"]}
          />
        </label>
        <label htmlFor="price" className={css["add-property__label"]}>
          <span>Price</span>
          <div className={css["add-property__price"]}>
            <span>£</span>
            <input
              type="number"
              id="price"
              name="price"
              value={formFields.price}
              min={0}
              step="any"
              onChange={handlePriceChange}
              required
            />
          </div>
        </label>
        <label htmlFor="city" className={css["add-property__label"]}>
          <span>City</span>
          <select
            id="city"
            name="city"
            value={formFields.city}
            onChange={handleFieldChange}
            className={css["add-property__select"]}
          >
            {cities.map((city) => {
              return (
                <option value={city} key={city}>
                  {city}
                </option>
              );
            })}
          </select>
        </label>
        <label htmlFor="email" className={css["add-property__label"]}>
          <span>Email</span>
          <input
            type="email"
            id="email"
            name="email"
            value={formFields.email}
            onChange={handleFieldChange}
            placeholder="fake.email@example.com"
            className={css["add-property__input"]}
            required
          />
        </label>
        <button type="submit" className={css["add-property__submit"]}>
          Add
        </button>
      </form>
    </div>
  );
};

AddProperty.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  types: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AddProperty;
