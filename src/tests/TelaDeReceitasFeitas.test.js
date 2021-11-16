import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helper/renderWithRouter';

const mockDoneRecipes = [
  {
    id: '52771',
    type: 'comida',
    area: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'bebida',
    area: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

const ReceitasFeitasPath = '/receitas-feitas';

const getFiltroAll = () => screen.queryByTestId('filter-by-all-btn');
const getFiltroFood = () => screen.queryByTestId('filter-by-food-btn');
const getFiltroDrinks = () => screen.queryByTestId('filter-by-drink-btn');
const getCardImage = (index) => screen.queryByTestId(`${index}-horizontal-image`);
const getCardText = (index) => screen.queryByTestId(`${index}-horizontal-top-text`);
const getCardName = (index) => screen.queryByTestId(`${index}-horizontal-name`);
const getCardDate = (index) => screen.queryByTestId(`${index}-horizontal-done-date`);
const getCardShareBtn = (index) => screen.queryByTestId(`${index}-horizontal-share-btn`);
const getCardTagName = (index, tagName) => screen
  .queryByTestId(`${index}-${tagName}-horizontal-tag`);

describe('Testando a tela de receitas feitas', () => {
  afterEach(() => { localStorage.removeItem('doneRecipes'); });
  test('54 - Testa se todos os data-testids estão disponíveis', () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('doneRecipes', JSON.stringify(mockDoneRecipes));
    history.push(ReceitasFeitasPath);
    expect(getFiltroAll()).toBeTruthy();
    expect(getFiltroFood()).toBeTruthy();
    expect(getFiltroDrinks()).toBeTruthy();
    act(() => {
      userEvent.click(getFiltroAll());
    });
    mockDoneRecipes.forEach((item, index) => {
      expect(getCardImage(index)).toBeTruthy();
      expect(getCardText(index)).toBeTruthy();
      expect(getCardName(index)).toBeTruthy();
      expect(getCardShareBtn(index)).toBeTruthy();
      expect(getCardDate(index)).toBeTruthy();
      if (item.type === 'comida') {
        expect(getCardTagName(index, item.tags[0])).toBeTruthy();
        expect(getCardTagName(index, item.tags[1])).toBeTruthy();
      }
    });
  });

  test('55- Testa se os cards possuem os atributos corretos de uma comida', () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('doneRecipes', JSON.stringify(mockDoneRecipes));
    history.push(ReceitasFeitasPath);
    act(() => {
      userEvent.click(getFiltroAll());
    });
    expect(getCardImage(0).src).toBe(mockDoneRecipes[0].image);
    expect(getCardName(0).innerHTML).toBe(mockDoneRecipes[0].name);
    expect(getCardText(0).innerHTML).toContain(mockDoneRecipes[0].area);
    expect(getCardText(0).innerHTML).toContain(mockDoneRecipes[0].category);
    mockDoneRecipes.forEach((item, index) => {
      if (item.type === 'comida') {
        expect(getCardTagName(index, item.tags[0]).innerHTML)
          .toBe(mockDoneRecipes[0].tags[0]);
        expect(getCardTagName(index, item.tags[1]).innerHTML)
          .toBe(mockDoneRecipes[0].tags[1]);
      }
    });
  });

  test('56- Testa se os cards possuem os atributos corretos de uma bebidax', () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('doneRecipes', JSON.stringify(mockDoneRecipes));
    history.push(ReceitasFeitasPath);
    act(() => {
      userEvent.click(getFiltroAll());
    });
    expect(getCardImage(1).src).toBe(mockDoneRecipes[1].image);
    expect(getCardName(1).innerHTML).toBe(mockDoneRecipes[1].name);
    expect(getCardText(1).innerHTML).toContain(mockDoneRecipes[1].alcoholicOrNot);
  });

  test('58 - Testa se os botões de filtragem funcionam devidamente', () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('doneRecipes', JSON.stringify(mockDoneRecipes));
    history.push(ReceitasFeitasPath);

    act(() => {
      userEvent.click(getFiltroDrinks());
    });
    expect(getCardImage(1)).toBeNull();
    expect(getCardName(1)).toBeNull();
    expect(getCardText(1)).toBeNull();
    expect(getCardText(1)).toBeNull();
    expect(getCardImage(0).src).toBe(mockDoneRecipes[1].image);
    expect(getCardName(0).innerHTML).toBe(mockDoneRecipes[1].name);
    expect(getCardText(0).innerHTML).toContain(mockDoneRecipes[1].alcoholicOrNot);

    act(() => {
      userEvent.click(getFiltroFood());
    });
    expect(getCardImage(1)).toBeNull();
    expect(getCardName(1)).toBeNull();
    expect(getCardText(1)).toBeNull();
    expect(getCardText(1)).toBeNull();
    expect(getCardImage(0).src).not.toBe(mockDoneRecipes[1].image);
    expect(getCardName(0).innerHTML).not.toBe(mockDoneRecipes[1].name);
    expect(getCardText(0).innerHTML).not.toContain(mockDoneRecipes[1].alcoholicOrNot);
  });

  test('59 - Testa se ao clicar na imagem a página é redirecionada', () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('doneRecipes', JSON.stringify(mockDoneRecipes));
    history.push(ReceitasFeitasPath);
    act(() => {
      userEvent.click(getFiltroAll());
    });
    expect(getCardImage(0).src).toBe(mockDoneRecipes[0].image);
    const anchor = screen.getAllByRole('link')[2];
    userEvent.click(anchor);
    expect(anchor.href).toContain(history.location.pathname);

    history.push(ReceitasFeitasPath);
    act(() => {
      userEvent.click(getFiltroAll());
    });
    expect(getCardImage(0).src).toBe(mockDoneRecipes[0].image);
    const anchor2 = screen.getAllByRole('link')[1];
    console.log(anchor2.href, anchor.href);
    userEvent.click(anchor2);
    expect(anchor2.href).toBe(anchor.href);
    expect(anchor2.href).toContain(history.location.pathname);
  });
});
