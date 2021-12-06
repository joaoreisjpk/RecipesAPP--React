import React from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  dataID: string;
  disabled?: boolean;
  id?: string;
}

function Button({ text, onClick, dataID, disabled, id }: ButtonProps): JSX.Element {
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

export default Button;
