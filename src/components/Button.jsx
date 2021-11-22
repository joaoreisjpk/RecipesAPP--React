import PropTypes from 'prop-types';
import React from 'react';

function Button({ text, onClick, dataID, disabled, id }) {
  return (
    <button
      type="button"
      onClick={ onClick }
      data-testid={ dataID }
      id={ id }
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
  id: PropTypes.string,
};

Button.defaultProps = {
  disabled: false,
  onClick: () => null,
  id: '',
};

export default Button;
