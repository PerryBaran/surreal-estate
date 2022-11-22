import axios from "axios";

const getProperty = async (setProperties, setAlert) => {
  try {
    const { data } = await axios.get(
      "http://localhost:3000/api/v1/PropertyListing"
    );
    setProperties(data);
    setAlert("");
  } catch (err) {
    console.log(err);
    setAlert("Server Error, please try again later.");
  }
};

export default getProperty;
