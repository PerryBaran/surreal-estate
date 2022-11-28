import React from "react";
import { GoogleLogout } from "react-google-login";
import PropTypes from "prop-types";

const Logout = ({ onSuccess }) => {
  return (
    <GoogleLogout
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      buttonText="Logout"
      onLogoutSuccess={onSuccess}
    />
  );
};

Logout.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default Logout;
