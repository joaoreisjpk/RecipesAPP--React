import PropTypes from 'prop-types';
import React from 'react';

function Button({ text, onClick, dataID, disabled }) {
  return (
    <button
      type="button"
      onClick={ onClick }
      data-testid={ dataID }
      disabled={ disabled }
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  dataID: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default Button;
