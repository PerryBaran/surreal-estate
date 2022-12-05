/* eslint-disable no-console */
import axios from "axios";
import endpoint from "../data/endpoint";

const postProperty = async (property) => {
  const address = `${endpoint}/PropertyListing`;

  try {
    await axios.post(address, property);
  } catch (err) {
    console.error(err);
    throw new Error(
      "Server Error, failed to add property. Please try again later."
    );
  }
};

export default postProperty;
