import React from "react";
import PropTypes from "prop-types";
import css from "../styles/saveProperty.module.css";

const SaveProperty = ({
  userId,
  _id,
  favouriteId,
  onSaveProperty,
  onRemoveProperty,
}) => {
  if (!userId) return null;

  return favouriteId ? (
    <button
      type="button"
      onClick={() => onRemoveProperty(favouriteId)}
      className={css["remove-property"]}
    >
      <span>Saved</span>
    </button>
  ) : (
    <button
      type="button"
      onClick={() => onSaveProperty(_id)}
      className={css["save-property"]}
    >
      Save
    </button>
  );
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
