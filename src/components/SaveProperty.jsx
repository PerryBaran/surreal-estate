import React from "react";
import PropTypes from "prop-types";
import style from "../styles/saveProperty.module.css";

const SaveProperty = ({
  userId,
  _id,
  favouriteId,
  onSaveProperty,
  onRemoveProperty,
}) => {
  if (userId) {
    if (favouriteId) {
      return (
        <button
          type="button"
          onClick={() => onRemoveProperty(favouriteId)}
          className={style["remove-property"]}
        >
          <span>Saved</span>
        </button>
      );
    }
    return (
      <button
        type="button"
        onClick={() => onSaveProperty(_id)}
        className={style["save-property"]}
      >
        Save
      </button>
    );
  }
  return null;
};

SaveProperty.defaultProps = {
  favouriteId: null,
};

SaveProperty.propTypes = {
  _id: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  favouriteId: PropTypes.string,
  onSaveProperty: PropTypes.func.isRequired,
  onRemoveProperty: PropTypes.func.isRequired,
};

export default SaveProperty;
