import React from "react";
import PropTypes from "prop-types";
import css from "../styles/alert.module.css";

const Alert = ({ message, success }) => {
  if (!message) return null;

  return (
    <p className={`${css.alert} ${success ? css.success : css.error}`}>
      {message}
    </p>
  );
};

Alert.defaultProps = {
  success: false,
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  success: PropTypes.bool,
};

export default Alert;
