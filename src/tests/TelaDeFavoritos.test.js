import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helper/renderWithRouter';

const TRES = 3;

const mockFavorites = [{
  id: '15997',
  type: 'bebida',
  area: '',
  category: 'Ordinary Drink',
  alcoholicOrNot: 'Optional alcohol',
  name: 'GG',
  image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
},
{
  id: '17222',
  type: 'bebida',
  area: '',
  category: 'Cocktail',
  alcoholicOrNot: 'Alcoholic',
  name: 'A1',
  image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
},
{
  id: '53060',
  type: 'comida',
  area: 'Croatian',
  category: 'Side',
  alcoholicOrNot: '',
  name: 'Burek',
  image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
},
{
  id: '53026',
  type: 'comida',
  area: 'Egyptian',
  category: 'Vegetarian',
  alcoholicOrNot: '',
  name: 'Tamiya',
  image: 'https://www.themealdb.com/images/media/meals/n3xxd91598732796.jpg',
}];

const ReceitasFavoritasPath = '/receitas-favoritas';

const getFiltroAll = () => screen.queryByTestId('filter-by-all-btn');
const getFiltroFood = () => screen.queryByTestId('filter-by-food-btn');
const getFiltroDrinks = () => screen.queryByTestId('filter-by-drink-btn');
const getCardImage = (index) => screen.queryByTestId(`${index}-horizontal-image`);
const getCardText = (index) => screen.queryByTestId(`${index}-horizontal-top-text`);
const getCardName = (index) => screen.queryByTestId(`${index}-horizontal-name`);
const getCardShareBtn = (index) => screen.queryByTestId(`${index}-horizontal-share-btn`);
function getCardFavoriteBtn(index) {
  return screen.queryByTestId(`${index}-horizontal-favorite-btn`);
}

/* const getCardTagName = (index, tagName) => screen.getByTestId(`
  ${index}-${tagName}-horizontal-tag`); */

describe('Testando a tela de favoritos', () => {
  afterEach(() => { localStorage.removeItem('favoriteRecipes'); });
  test('60 - Testa se todos os data-testids estão disponíveis', () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockFavorites));
    history.push(ReceitasFavoritasPath);
    expect(getFiltroAll()).toBeTruthy();
    expect(getFiltroFood()).toBeTruthy();
    expect(getFiltroDrinks()).toBeTruthy();
    act(() => {
      userEvent.click(getFiltroAll());
    });
    mockFavorites.forEach((item, index) => {
      expect(getCardImage(index)).toBeTruthy();
      expect(getCardText(index)).toBeTruthy();
      expect(getCardName(index)).toBeTruthy();
      expect(getCardShareBtn(index)).toBeTruthy();
      expect(getCardFavoriteBtn(index)).toBeTruthy();
      // getCardTagName(item.category, index);
    });
  });

  test('61- Testa se os cards possuem os atributos corretos de uma comida', () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockFavorites));
    history.push(ReceitasFavoritasPath);
    act(() => {
      userEvent.click(getFiltroAll());
    });
    expect(getCardImage(2).src).toBe(mockFavorites[2].image);
    expect(getCardName(2).innerHTML).toBe(mockFavorites[2].name);
    expect(getCardText(2).innerHTML).toContain(mockFavorites[2].area);
    expect(getCardText(2).innerHTML).toContain(mockFavorites[2].category);
  });

  test('62- Testa se os cards possuem os atributos corretos de uma bebidax', () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockFavorites));
    history.push(ReceitasFavoritasPath);
    act(() => {
      userEvent.click(getFiltroAll());
    });
    expect(getCardImage(0).src).toBe(mockFavorites[0].image);
    expect(getCardName(0).innerHTML).toBe(mockFavorites[0].name);
    expect(getCardText(0).innerHTML).toContain(mockFavorites[0].alcoholicOrNot);
  });

  test('64 - Testa se o botão desfavoritar funciona devidamente', () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockFavorites));
    history.push(ReceitasFavoritasPath);
    act(() => {
      userEvent.click(getFiltroAll());
    });
    act(() => {
      userEvent.click(getCardFavoriteBtn(0));
    });
    expect(getCardImage(TRES)).toBeNull();
    expect(getCardText(TRES)).toBeNull();
    expect(getCardName(TRES)).toBeNull();
    expect(getCardShareBtn(TRES)).toBeNull();
    expect(getCardFavoriteBtn(TRES)).toBeNull();
    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toHaveLength(TRES);
  });

  test('64 - Testa se os botões de filtragem funcionam devidamente', () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockFavorites));
    history.push(ReceitasFavoritasPath);

    act(() => {
      userEvent.click(getFiltroDrinks());
    });
    expect(getCardImage(2)).toBeNull();
    expect(getCardName(2)).toBeNull();
    expect(getCardText(2)).toBeNull();
    expect(getCardText(2)).toBeNull();
    expect(getCardImage(0).src).toBe(mockFavorites[0].image);
    expect(getCardName(0).innerHTML).toBe(mockFavorites[0].name);
    expect(getCardText(0).innerHTML).toContain(mockFavorites[0].alcoholicOrNot);

    act(() => {
      userEvent.click(getFiltroFood());
    });
    expect(getCardImage(2)).toBeNull();
    expect(getCardName(2)).toBeNull();
    expect(getCardText(2)).toBeNull();
    expect(getCardText(2)).toBeNull();
    expect(getCardImage(0).src).not.toBe(mockFavorites[0].image);
    expect(getCardName(0).innerHTML).not.toBe(mockFavorites[0].name);
    expect(getCardText(0).innerHTML).not.toContain(mockFavorites[0].alcoholicOrNot);
  });

  test('65 - Testa se ao clicar na imagem a página é redirecionada', () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockFavorites));
    history.push(ReceitasFavoritasPath);
    act(() => {
      userEvent.click(getFiltroAll());
    });
    expect(getCardImage(0).src).toBe(mockFavorites[0].image);
    const anchor = screen.getAllByRole('link')[2];
    userEvent.click(anchor);
    expect(anchor.href).toContain(history.location.pathname);

    history.push(ReceitasFavoritasPath);
    act(() => {
      userEvent.click(getFiltroAll());
    });
    expect(getCardImage(0).src).toBe(mockFavorites[0].image);
    const anchor2 = screen.getAllByRole('link')[1];
    console.log(anchor2.href, anchor.href);
    userEvent.click(anchor2);
    expect(anchor2.href).toBe(anchor.href);
    expect(anchor2.href).toContain(history.location.pathname);
  });
});
