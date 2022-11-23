import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import style from "../styles/properties.module.css";
import getProperty from "../requests/getProperty";
import PropertyCard from "./PropertyCard";
import Alert from "./Alert";
import SideBar from "./SideBar";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [alert, setAlert] = useState("");
  const { search } = useLocation();

  useEffect(() => {
    getProperty(setProperties, setAlert, search);
  }, [search]);

  return (
    <div className={style.properties}>
      <SideBar />
      <div className={style["properties-main"]}>
        <Alert message={alert} />
        <div className={style["properties-array"]}>
          {properties.map((property) => {
            return <PropertyCard key={property._id} {...property} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Properties;
