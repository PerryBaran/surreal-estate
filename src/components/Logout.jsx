/* eslint-disable no-console */
import React from "react";
import { GoogleLogout } from "react-google-login";
import PropTypes from "prop-types";

const Logout = ({ onSuccess }) => {
  const onFailure = (response) => {
    console.error(response);
  };

  return (
    <GoogleLogout
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      buttonText="Logout"
      onLogoutSuccess={onSuccess}
      onFailure={onFailure}
    />
  );
};

Logout.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default Logout;
