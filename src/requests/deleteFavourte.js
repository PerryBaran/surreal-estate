/* eslint-disable no-console */
import axios from "axios";
import endpoint from "../data/endpoint";

const deleteFavourite = async (favouriteId) => {
  const address = `${endpoint}/Favourite/${favouriteId}`;

  try {
    await axios.delete(address);
  } catch (err) {
    console.error(err);
  }
};

export default deleteFavourite;
