import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { gapi } from "gapi-script";
import style from "../styles/app.module.css";
import NavBar from "./NavBar";
import Properties from "./Properties";
import AddProperty from "./AddProperty";

const App = () => {
  const [userId, setUserId] = useState("");
  const cities = ["Manchester", "Leeds", "Sheffield", "Liverpool"];

  const handleLogin = ({ googleId }) => {
    setUserId(googleId);
  };

  const handleLogout = () => {
    setUserId("");
  };

  useEffect(() => {
    const start = () => {
      gapi.client.init({
        client_id: process.env.REACT_APP_CLIENT_ID,
        scope: "",
      });
    };

    gapi.load("client:auth2", start);
  });

  return (
    <div className={style.app}>
      <NavBar
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        userId={userId}
      />
      <Routes>
        <Route path="/" element={<Properties cities={cities} />} />
        <Route path="add-property" element={<AddProperty cities={cities} />} />
      </Routes>
    </div>
  );
};

export default App;
