/* eslint-disable no-console */
import axios from "axios";
import endpoint from "../data/endpoint";

const deleteFavourite = async (favouriteId) => {
  const address = `${endpoint}/Favourite/${favouriteId}`;

  try {
    await axios.delete(address);
  } catch (err) {
    console.error(err);
    throw new Error(
      "Server Error, failed to delete favourite. Please try again later."
    );
  }
};

export default deleteFavourite;
