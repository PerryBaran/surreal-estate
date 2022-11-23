import React from "react";
import { Routes, Route } from "react-router-dom";
import style from "../styles/app.module.css";
import NavBar from "./NavBar";
import Properties from "./Properties";
import AddProperty from "./AddProperty";

const App = () => {
  const cities = ["Manchester", "Leeds", "Sheffield", "Liverpool"];

  return (
    <div className={style.app}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Properties cities={cities} />} />
        <Route path="add-property" element={<AddProperty cities={cities} />} />
      </Routes>
    </div>
  );
};

export default App;
