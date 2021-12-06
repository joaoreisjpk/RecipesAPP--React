import React from 'react';

interface InputProps extends HTMLInputElement {
  dataID: string;
  label: string;
  selected?: string;
  onChange: () => void;
}

function Input({
  placeholder,
  dataID,
  label,
  id,
  name,
  value,
  onChange,
  type,
  selected }: InputProps) {
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
        checked={ selected === 'true' }
      />
    </label>
  );
}

export default Input;
