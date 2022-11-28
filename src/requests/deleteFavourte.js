/* eslint-disable no-console */
import axios from "axios";
import endpoint from "../data/endpoint";

const deleteFavourite = async (favouriteId, setTriggerGet) => {
  const address = `${endpoint}/Favourite/${favouriteId}`;

  try {
    const response = await axios.delete(address);
    console.log(response);
    setTriggerGet((prev) => prev + 1);
  } catch (err) {
    console.error(err);
  }
};

export default deleteFavourite;
