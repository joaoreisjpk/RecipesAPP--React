import PropTypes from 'prop-types';
import React from 'react';

function Input({
  placeholder,
  dataID,
  label,
  id,
  name,
  value,
  onChange,
  type,
  selected }) {
  return (
    <label htmlFor={ id }>
      {label}
      <input
        type={ type }
        data-testid={ dataID }
        id={ id }
        placeholder={ placeholder }
        name={ name }
        value={ value }
        onChange={ onChange }
        selected={ selected }
      />
    </label>
  );
}

Input.propTypes = {
  dataID: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Input;
