/* eslint-disable no-console */
import axios from "axios";
import endpoint from "../data/endpoint";

const postProperty = async (property, setAlert) => {
  const address = `${endpoint}/PropertyListing`;

  try {
    const response = await axios.post(address, property);
    setAlert({
      message: "Property added.",
      isSuccessful: true,
    });
    console.log(response);
  } catch (err) {
    console.error(err);
    setAlert({
      message: "Server Error, please try again",
      isSuccessful: false,
    });
  }
};

export default postProperty;
