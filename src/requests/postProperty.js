import axios from "axios";

const postProperty = async (property, setAlert) => {
  console.log("post")
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/PropertyListing",
      property
    );
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
