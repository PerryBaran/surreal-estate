/* eslint-disable no-console */
import React, { useState } from "react";
import PropTypes from "prop-types";
import style from "../styles/addProperty.module.css";
import postProperty from "../requests/postProperty";
import Alert from "./Alert";

const AddProperty = ({ cities, types }) => {
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

  const handleAddProperty = async (e) => {
    e.preventDefault();
    if (!formFields.title) {
      setAlert({
        message: "Please provide a valid title.",
        isSuccessful: false,
      });
    } else if (!formFields.price) {
      setAlert({
        message: "Price cannot be 0.",
        isSuccessful: false,
      });
    } else if (
      !formFields.email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
    ) {
      setAlert({
        message: "Please provide a valid email.",
        isSuccessful: false,
      });
    } else {
      try {
        await postProperty(formFields);
        setFormFields(initialState.form);
        setAlert({
          message: "Property added.",
          isSuccessful: true,
        });
      } catch (err) {
        console.error(err);
        setAlert({
          message: "Server Error, please try again.",
          isSuccessful: false,
        });
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
    const valueAsCurrency = Number(value.match(/[0-9]*[.]{0,1}[0-9]{0,2}/s)[0]);

    setFormFields({
      ...formFields,
      [name]: valueAsCurrency,
    });
  };

  return (
    <div className={style["add-property"]}>
      <form
        onSubmit={handleAddProperty}
        className={style["add-property-form"]}
        aria-label="form"
      >
        <Alert message={alert.message} success={alert.isSuccessful} />
        <label htmlFor="title" className={style["add-property-label"]}>
          <span>Title</span>
          <input
            id="title"
            name="title"
            value={formFields.title}
            onChange={handleFieldChange}
            placeholder="2 bed flat"
            className={style["add-property-input"]}
            required
          />
        </label>
        <label htmlFor="type" className={style["add-property-label"]}>
          <span>Type</span>
          <select
            id="type"
            name="type"
            value={formFields.type}
            onChange={handleFieldChange}
            className={style["add-property-select"]}
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
        <label htmlFor="bedrooms" className={style["add-property-label"]}>
          <span>Bedrooms</span>
          <input
            type="number"
            id="bedrooms"
            name="bedrooms"
            value={formFields.bedrooms}
            min={0}
            onChange={handleFieldChange}
            className={style["add-property-input"]}
          />
        </label>
        <label htmlFor="bathrooms" className={style["add-property-label"]}>
          <span>Bathrooms</span>
          <input
            type="number"
            id="bathrooms"
            name="bathrooms"
            value={formFields.bathrooms}
            min={0}
            onChange={handleFieldChange}
            className={style["add-property-input"]}
          />
        </label>
        <label htmlFor="price" className={style["add-property-label"]}>
          <span>Price</span>
          <div className={style["add-property-price"]}>
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
        <label htmlFor="city" className={style["add-property-label"]}>
          <span>City</span>
          <select
            id="city"
            name="city"
            value={formFields.city}
            onChange={handleFieldChange}
            className={style["add-property-select"]}
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
        <label htmlFor="email" className={style["add-property-label"]}>
          <span>Email</span>
          <input
            type="email"
            id="email"
            name="email"
            value={formFields.email}
            onChange={handleFieldChange}
            placeholder="fake.email@example.com"
            className={style["add-property-input"]}
            required
          />
        </label>
        <button type="submit" className={style["add-property-button"]}>
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
