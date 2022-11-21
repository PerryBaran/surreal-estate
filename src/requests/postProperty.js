import axios from "axios";

const postProperty = async (property) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/PropertyListing",
      property
    );
    console.log(response);
  } catch (err) {
    console.error(err);
  }
};

export default postProperty;
