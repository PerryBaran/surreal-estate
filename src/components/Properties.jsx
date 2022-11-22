import React, { useEffect, useState } from "react";
import style from "../styles/properties.module.css";
import getProperty from "../requests/getProperty";
import PropertyCard from "./PropertyCard";
import Alert from "./Alert";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [alert, setAlert] = useState("");

  useEffect(() => {
    getProperty(setProperties, setAlert);
  }, []);

  return (
    <div className={style.properties}>
      <Alert message={alert} />
      <div className={style["properties-array"]}>
        {properties.map((property) => {
          return <PropertyCard key={property._id} {...property} />;
        })}
      </div>
    </div>
  );
};

export default Properties;
