/* eslint-disable no-console */
import axios from "axios";
import endpoint from "../data/endpoint";

const getProperty = async (setProperties, setAlert, search, userId) => {
  let propertyAddress = `${endpoint}/PropertyListing`;
  if (search) {
    propertyAddress += search;
  }
  const favouriteAddress = `${endpoint}/Favourite?query={"fbUserId":"${userId}"}`;

  try {
    const { data: propertyData } = await axios.get(propertyAddress);
    if (userId) {
      const { data: favouriteData } = await axios.get(favouriteAddress);
      favouriteData.forEach((favourite) => {
        const dataIndex = propertyData.findIndex(
          (value) => value._id === favourite.propertyListing
        );
        if (dataIndex >= 0) {
          propertyData[dataIndex].favouriteId = favourite._id;
        }
      });
    }
    setProperties(propertyData);
    setAlert("");
  } catch (err) {
    console.error(err);
    setProperties([]);
    setAlert(
      "Server error, failed to retrieve properties. Please try again later."
    );
  }
};

export default getProperty;
