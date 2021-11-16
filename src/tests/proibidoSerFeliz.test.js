import fetchGetByIngredients from './mocks/resultFetchGetByIngredients';

const URL_INGREDIENTE = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';

const mockFetch = async (url) => ({
  ok: true,
  json: async () => {
    switch (url) {
    case 'https://www.themealdb.com/api/json/v1/1/filter.php?i=i':
      return fetchGetByIngredients;
    default:
      return null;
    }
  },
});

describe('Testa as APIS de getFood', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    global.fetch = jest.fn(mockFetch);
  });

  test('Testa a API getIngrediente', async () => {
    const fetchAPI = await fetchIngrediente('i');
    expect(fetchAPI)
      .toEqual(fetchGetByIngredients.meals);
  });

/*   test('Testa se a API getNome', async () => {
    const fetchAPI = await fetchIngrediente('');
    console.log(await fetchAPI);
    expect(fetchAPI)
      .toEqual(fetchGetByIngredients);
  }); */
});
