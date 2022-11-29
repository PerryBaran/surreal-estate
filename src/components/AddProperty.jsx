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
      bedrooms: 1,
      bathrooms: 1,
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

  const handleAddProperty = (e) => {
    e.preventDefault();
    if (!formFields.title || !formFields.price || !formFields.email) {
      setAlert({
        message: "Please fill in all fields.",
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
      postProperty(formFields, setAlert);
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

  return (
    <div className={style["add-property"]}>
      <form
        onSubmit={handleAddProperty}
        className={style.form}
        aria-label="form"
      >
        <Alert message={alert.message} success={alert.isSuccessful} />
        <label htmlFor="title" className={style.label}>
          Title:
          <input
            id="title"
            name="title"
            value={formFields.title}
            onChange={handleFieldChange}
            placeholder="2 bed flat"
            className={style.input}
          />
        </label>
        <label htmlFor="type">
          Type:
          <select
            id="type"
            name="type"
            value={formFields.type}
            onChange={handleFieldChange}
            className={style.input}
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
        <div className={style.rooms}>
          <label htmlFor="bedrooms">
            Bedrooms:
            <input
              type="number"
              id="bedrooms"
              name="bedrooms"
              value={formFields.bedrooms}
              min={1}
              max={9}
              onChange={handleFieldChange}
              className={style.number}
            />
          </label>
          <label htmlFor="bathrooms">
            Bathrooms:
            <input
              type="number"
              id="bathrooms"
              name="bathrooms"
              value={formFields.bathrooms}
              min={1}
              max={9}
              onChange={handleFieldChange}
              className={style.number}
            />
          </label>
        </div>
        <label htmlFor="price">
          Price:
          <input
            type="number"
            id="price"
            name="price"
            value={formFields.price}
            min={0}
            step="any"
            onChange={handleFieldChange}
            className={style.input}
          />
        </label>
        <label htmlFor="city">
          City:
          <select
            id="city"
            name="city"
            value={formFields.city}
            onChange={handleFieldChange}
            className={style.input}
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
        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            name="email"
            value={formFields.email}
            onChange={handleFieldChange}
            placeholder="perry.baran@email.com"
            className={style.input}
          />
        </label>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

AddProperty.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  types: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AddProperty;
