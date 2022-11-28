/* eslint-disable no-console */
import axios from "axios";
import endpoint from "../data/endpoint";

const getProperty = async (setProperties, setAlert, search) => {
  let address = `${endpoint}/PropertyListing`;
  if (search) {
    address += search;
  }

  try {
    const { data } = await axios.get(address);
    setProperties(data);
    setAlert("");
  } catch (err) {
    console.error(err);
    setProperties([]);
    setAlert("Server Error, please try again later.");
  }
};

export default getProperty;
