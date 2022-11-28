import React from "react";
import { GoogleLogin } from "react-google-login";
import PropTypes from "prop-types";

const Login = ({ onSuccess }) => {
  const onFailure = (response) => {
    console.error(response);
  };

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      buttonText="Login"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy="single_host_origin"
      isSignedIn
    />
  );
};

Login.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default Login;
