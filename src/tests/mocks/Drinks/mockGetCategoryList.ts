export const fetchCategoryList = {
  drinks: [
    {
      strCategory: 'Ordinary Drink',
    },
    {
      strCategory: 'Cocktail',
    },
    {
      strCategory: 'Milk / Float / Shake',
    },
    {
      strCategory: 'Other/Unknown',
    },
    {
      strCategory: 'Cocoa',
    },
    {
      strCategory: 'Shot',
    },
    {
      strCategory: 'Coffee / Tea',
    },
    {
      strCategory: 'Homemade Liqueur',
    },
    {
      strCategory: 'Punch / Party Drink',
    },
    {
      strCategory: 'Beer',
    },
    {
      strCategory: 'Soft Drink / Soda',
    },
  ],
};

export const resultCategoryList = {
  drinks: [
    {
      category: 'Ordinary Drink',
    },
    {
      category: 'Cocktail',
    },
    {
      category: 'Milk / Float / Shake',
    },
    {
      category: 'Other/Unknown',
    },
    {
      category: 'Cocoa',
    },
    {
      category: 'Shot',
    },
    {
      category: 'Coffee / Tea',
    },
    {
      category: 'Homemade Liqueur',
    },
    {
      category: 'Punch / Party Drink',
    },
    {
      category: 'Beer',
    },
    {
      category: 'Soft Drink / Soda',
    },
  ],
};

/*   test('18 - Verifica o Alert', async () => {
    const mockFetcher = async (url) => ({
      ok: true,
      json: async () => {
        switch (url) {
        case 'https://www.themealdb.com/api/json/v1/1/list.php?c=list':
          return MockData;
        default:
          return { meals: null };
        }
      },
    });
    global.alert = jest.fn(() => {});
    global.fetch = jest.fn(mockFetcher);
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');

    act(() => userEvent.click(getSearchButton()));
    act(() => {
      userEvent.click(getNameRadio());
      userEvent.type(getSearchInput(), 'Xablau');
    });
    userEvent.click(getExecBtn());

    await setTimeout(() => {
      console.log('AWAAIT');
    }, 100 * 2 * 2 * 2 * 2);

    expect(global.alert).toBeCalled();
  }); */
