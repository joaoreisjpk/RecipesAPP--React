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
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          render={ (props) => <ExploreFoodsIngredients { ...props } /> }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          render={ (props) => <ExploreDrinksIngredients { ...props } /> }
        />
        <Route
          exact
          path="/explorar/comidas/area"
          render={ (props) => <ExploreFoodsArea { ...props } /> }
        />
        <Route
          exact
          path="/explorar/bebidas/area"
          render={ (props) => <ExploreDrinksArea { ...props } /> }
        />
        <Route
          exact
          path="/explorar/comidas"
          render={ (props) => <ExploreFoods { ...props } /> }
        />
        <Route
          exact
          path="/explorar/bebidas"
          render={ (props) => <ExploreDrinks { ...props } /> }
        />
        <Route exact path="/explorar" render={ (props) => <Explore { ...props } /> } />
        <Route
          exact
          path="/comidas/:idMeal/in-progress"
          render={ (props) => <InProgressFoodRecipe { ...props } /> }
        />
        <Route
          exact
          path="/bebidas/:idDrink/in-progress"
          render={ (props) => <InProgressDrinkRecipe { ...props } /> }
        />
        <Route
          exact
          path="/comidas/:idMeal"
          render={ (props) => <FoodRecipe { ...props } /> }
        />
        <Route
          exact
          path="/bebidas/:idDrink"
          render={ (props) => <DrinkRecipe { ...props } /> }
        />
        <Route exact path="/comidas" render={ (props) => <Foods { ...props } /> } />
        <Route exact path="/bebidas" render={ (props) => <Drinks { ...props } /> } />
        <Route
          exact
          path="/receitas-feitas"
          render={ (props) => <DoneRecipes { ...props } /> }
        />
        <Route
          exact
          path="/receitas-favoritas"
          render={ (props) => <FavoriteRecipes { ...props } /> }
        />
        <Route exact path="/perfil" render={ (props) => <Perfil { ...props } /> } />
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
      </Switch>
    );
  }
}

export default Switcher;
