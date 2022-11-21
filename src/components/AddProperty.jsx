import React, { useReducer } from "react";
import style from "../styles/addProperty.module.css";

const initialState = {
  title: "",
  type: "Flat",
  bedrooms: 1,
  bathrooms: 1,
  price: 0,
  city: "Manchester",
  email: "",
};

const reducer = (state, { type, key, value }) => {
  switch (type) {
    case "update":
      return {
        ...state,
        [key]: value,
      };
    default:
      return {
        state,
      };
  }
};

const AddProperty = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleAddProperty = (e) => {
    e.preventDefault();
    console.log(state);
  };

  const handleFieldChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    dispatch({
      type: "update",
      key: name,
      value,
    });
  };

  return (
    <div className={style["add-property"]}>
      <form onSubmit={handleAddProperty} className={style.form}>
        <label htmlFor="title" className={style.label}>
          Title:
          <input
            id="title"
            name="title"
            value={state.title}
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
            value={state.type}
            onChange={handleFieldChange}
            className={style.input}
          >
            <option value="Flat">Flat</option>
            <option value="Detached">Detached</option>
            <option value="Semi-Detached">Semi-Detached</option>
            <option value="Terraced">Terraced</option>
            <option value="End Of Terrace">End Of Terrace</option>
            <option value="Cottage">Cottage</option>
            <option value="Bungalow">Bungalow</option>
          </select>
        </label>
        <div className={style.rooms}>
          <label htmlFor="bedrooms">
            Bedrooms:
            <input
              type="number"
              id="bedrooms"
              name="bedrooms"
              value={state.bedrooms}
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
              value={state.bathrooms}
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
            value={state.price}
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
            value={state.city}
            onChange={handleFieldChange}
            className={style.input}
          >
            <option value="Manchester">Manchester</option>
            <option value="Leeds">Leeds</option>
            <option value="Sheffield">Sheffield</option>
            <option value="Liverpool">Liverpool</option>
          </select>
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            name="email"
            value={state.email}
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

export default AddProperty;
