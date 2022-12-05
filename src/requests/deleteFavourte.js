/* eslint-disable no-console */
import axios from "axios";
import endpoint from "../data/endpoint";

const deleteFavourite = async (favouriteId, setAlert) => {
  const address = `${endpoint}/Favourite/${favouriteId}`;

  try {
    await axios.delete(address);
    setAlert("");
  } catch (err) {
    console.error(err);
    setAlert(
      "Server error, failed to remove favourite. Please try again later."
    );
  }
};

export default deleteFavourite;
