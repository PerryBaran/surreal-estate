/* eslint-disable no-console */
import axios from "axios";
import endpoint from "../data/endpoint";

const postProperty = async (property, setAlert, handleResetForm) => {
  const address = `${endpoint}/PropertyListing`;

  try {
    await axios.post(address, property);
    setAlert({
      message: "Property added.",
      isSuccessful: true,
    });
    handleResetForm();
  } catch (err) {
    console.error(err);
    setAlert({
      message: "Server error, please try again.",
      isSuccessful: false,
    });
  }
};

export default postProperty;
