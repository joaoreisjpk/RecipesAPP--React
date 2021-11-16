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
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};

Button.defaultProps = {
  disabled: false,
  onClick: () => null,
};

export default Button;
