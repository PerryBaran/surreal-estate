import React from "react";
import PropTypes from "prop-types";
import { ClipLoader } from "react-spinners";
import css from "../styles/loader.module.css";

const Loader = ({ loading, size }) => {
  return (
    <div className={css.loader}>
      <ClipLoader
        color="#a20aa2"
        loading={loading}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

Loader.defaultProps = {
  size: 25,
};

Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
  size: PropTypes.number,
};

export default Loader;
