/* eslint-disable no-console */
import axios from "axios";
import endpoint from "../data/endpoint";

const postFavourite = async (propertyInfo, setAlert) => {
  const address = `${endpoint}/Favourite`;

  try {
    await axios.post(address, propertyInfo);
    setAlert("");
  } catch (err) {
    console.error(err);
    setAlert("Server error, failed to add favourite. Please try again later.");
  }
};

export default postFavourite;
