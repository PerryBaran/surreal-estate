import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { gapi } from "gapi-script";
import NavBar from "./NavBar";
import Properties from "./Properties";
import AddProperty from "./AddProperty";

const App = () => {
  const [userId, setUserId] = useState("");
  const options = {
    cities: ["Manchester", "Leeds", "Sheffield", "Liverpool"],
    types: [
      "Flat",
      "Detached",
      "Semi-Detached",
      "Terraced",
      "End Of Terrace",
      "Cottage",
      "Bungalow",
    ],
  };

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
    <div>
      <NavBar
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        userId={userId}
      />
      <div>
        <Routes>
          <Route
            path="/"
            element={<Properties options={options} userId={userId} />}
          />
          <Route
            path="add-property"
            element={
              <AddProperty cities={options.cities} types={options.types} />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
