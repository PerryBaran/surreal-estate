/* eslint-disable no-console */
import axios from "axios";
import endpoint from "../data/endpoint";

const postFavourite = async (propertyInfo) => {
  const address = `${endpoint}/Favourite`;

  try {
    const response = await axios.post(address, propertyInfo);
    console.log(response);
  } catch (err) {
    console.error(err);
  }
};

export default postFavourite;
