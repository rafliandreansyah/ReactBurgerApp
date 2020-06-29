import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
};

const INGREDIENT_PRICE = {
  salad: 0.2,
  bacon: 0.1,
  cheese: 0.3,
  meat: 0.5,
};

const addIngredients = (state, action) => {
  // Immutable Update Patterns dengan tidak mengakses secara langsung state dan mengkloning state lama untuk update data state
  const updateIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  };
  const updateIngredients = updateObject(state.ingredients, updateIngredient);
  const updateState = {
    ingredients: updateIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
  };
  return updateObject(state, updateState);
};

const removeIngredients = (state, action) => {
  const updateIngr = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
  };
  const updateIngrs = updateObject(state.ingredients, updateIngr);
  const updateSt = {
    ingredients: updateIngrs,
    totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
  };
  return updateObject(state, updateSt);
  // Immutable Update Patterns dengan tidak mengakses secara langsung state dan mengkloning state lama untuk update data state
};

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
    },
    totalPrice: 4,
    error: false,
  });
};

const fetchError = (state, action) => {
  return updateObject(state, { error: true });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENTS:
      return addIngredients(state, action);

    case actionTypes.REMOVE_INGREDIENTS:
      return removeIngredients(state, action);

    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);

    case actionTypes.FETCH_INGREDIENTS_ERROR:
      return fetchError(state, action);

    default:
      return state;
  }
};

export default reducer;
