import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const initPurchased = (state, action) => {
  return updateObject(state, { purchased: false });
};

const purchaseBurgerStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = {
    ...action.orderData,
    id: action.orderId,
  };
  return updateObject(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder),
  });
};

const purchaseBurgerFailed = (state, action) => {
  return updateObject(state, { loading: false });
};

const fetchOrderStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchOrderSuccess = (state, action) => {
  return updateObject(state, { loading: false, orders: action.orders });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_PURCHASED:
      return initPurchased;

    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart;

    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess;

    case actionTypes.PURCHASE_BURGER_FAILED:
      return purchaseBurgerFailed;

    case actionTypes.FETCH_ORDERS_START:
      return fetchOrderStart;

    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrderSuccess;

    default:
      return state;
  }
};

export default reducer;
