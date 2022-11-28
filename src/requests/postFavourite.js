/* eslint-disable no-console */
import axios from "axios";
import endpoint from "../data/endpoint";

const postFavourite = async (propertyInfo, setTriggerGet) => {
  const address = `${endpoint}/Favourite`;

  try {
    await axios.post(address, propertyInfo);
    setTriggerGet((prev) => prev + 1);
  } catch (err) {
    console.error(err);
  }
};

export default postFavourite;
