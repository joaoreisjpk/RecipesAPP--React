import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Foods from '../pages/Foods';
import Drinks from '../pages/Drinks';
import FoodRecipe from '../pages/FoodRecipe';
import InProgressFoodRecipe from '../pages/InProgressFoodRecipe';
import InProgressDrinkRecipe from '../pages/InProgressDrinkRecipe';
import DrinkRecipe from '../pages/DrinkRecipe';
import Explore from '../pages/Explore';
import ExploreFoods from '../pages/ExploreFoods';
import ExploreDrinks from '../pages/ExploreDrinks';
import ExploreFoodsIngredients from '../pages/ExploreFoodsIngredients';
import ExploreDrinksIngredients from '../pages/ExploreDrinksIngredients';
import ExploreFoodsArea from '../pages/ExploreFoodsArea';
import Perfil from '../pages/Perfil';
import DoneRecipes from '../pages/DoneRecipes';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import ExploreDrinksArea from '../pages/ExploreDrinksArea';

class Switcher extends Component {
  render(): JSX.Element {
    return (
      <Switch>
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ExploreFoodsIngredients}
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ExploreDrinksIngredients}
        />
        <Route
          exact
          path="/explorar/comidas/area"
          component={ ExploreFoodsArea }
        />
        <Route
          exact
          path="/explorar/bebidas/area"
          component={ ExploreDrinksArea }
        />
        <Route
          exact
          path="/explorar/comidas"
          component={ ExploreFoods }
        />
        <Route
          exact
          path="/explorar/bebidas"
          component={ ExploreDrinks }
        />
        <Route exact path="/explorar" component={ Explore } />
        <Route
          exact
          path="/comidas/:idMeal/in-progress"
          component={InProgressFoodRecipe}
        />
        <Route
          exact
          path="/bebidas/:idDrink/in-progress"
          component={InProgressDrinkRecipe}
        />
        <Route
          exact
          path="/comidas/:idMeal"
          component={FoodRecipe}
        />
        <Route
          exact
          path="/bebidas/:idDrink"
          component={DrinkRecipe}
        />
        <Route exact path="/comidas" component={Foods} />
        <Route exact path="/bebidas" component={Drinks} />
        <Route
          exact
          path="/receitas-feitas"
          component={DoneRecipes}
        />
        <Route
          exact
          path="/receitas-favoritas"
          component={FavoriteRecipes}
        />
        <Route exact path="/perfil" component={Perfil} />
        <Route exact path="/" component={Login} />
      </Switch>
    );
  }
}

export default Switcher;
