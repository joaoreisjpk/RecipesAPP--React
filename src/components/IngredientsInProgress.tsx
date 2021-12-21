/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

interface IngredientsInProgressProps {
  index: number;
  ingrediente: string,
  measures: string[],
  id: string;
  type?: string;
  handleButton: () => void;
}

function IngredientsInProgress({
  index,
  ingrediente,
  measures,
  id,
  type,
  handleButton }: IngredientsInProgressProps) {
  const { push } = useRouter();
  const [checked, setChecked] = useState(true);

  const keyInProgress = (): any => JSON.parse(localStorage.getItem('inProgressRecipes') || '{}');

  useEffect(() => {
    try {
      setChecked(type === 'bebida'
        ? keyInProgress().cocktails[id].some((ingredient: number) => ingredient === index)
        : keyInProgress().meals[id].some((ingredient: number) => ingredient === index));
    } catch {
      push(`/${type}s/${id}`);
    }
  }, []);

  function addIngredientInLocalStorage() {
    if (type === 'bebida') {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: {
          ...keyInProgress().cocktails,
          [id]: !checked
            ? [...keyInProgress().cocktails[id], index]
            : [...keyInProgress().cocktails[id]
              .filter((ingredient: number) => ingredient !== index)],
        },
        meals: {
          ...keyInProgress().meals,
        },
      }));
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        meals: {
          ...keyInProgress().meals,
          [id]: !checked
            ? [...keyInProgress().meals[id], index]
            : [...keyInProgress().meals[id].filter((ingredient: number) => ingredient !== index)],
        },
        cocktails: {
          ...keyInProgress().cocktails,
        },
      }));
    }
  }

  const handleChange = () => {
    setChecked(!checked);
    addIngredientInLocalStorage();
    handleButton();
  };

  return (
    <label
      style={ checked ? { textDecoration: 'line-through' } : undefined }
      htmlFor={ ingrediente }
    >
      { !checked ? (
        <input
          key="!checked"
          type="checkbox"
          id={ ingrediente }
          onChange={ handleChange }
        />)
        : (
          <input
            key="checked"
            type="checkbox"
            checked
            id={ ingrediente }
            onChange={ handleChange }
          />)}
      <span>{ `${ingrediente} - Medida: ${measures[index]}` }</span>
    </label>
  );
}

export default IngredientsInProgress;
