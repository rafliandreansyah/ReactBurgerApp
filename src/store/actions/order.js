import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseBurgerFailed = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    error: error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const puchaseBurger = (orderData) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios
      .post("/orders.json", orderData)
      .then((response) => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch((error) => {
        dispatch(purchaseBurgerFailed(error));
      });
  };
};

export const initPurchased = () => {
  return {
    type: actionTypes.INIT_PURCHASED,
  };
};

export const fetchOrderStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrderSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};

export const fetchOrderFailed = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    error: error,
  };
};

export const fetchOrder = () => {
  return (dispatch) => {
    dispatch(fetchOrderStart());
    axios
      .get("/orders.json")
      .then((res) => {
        console.log(res.data);
        const fetchOrder = [];
        for (let key in res.data) {
          console.log(res.data[key]);
          fetchOrder.push({ ...res.data[key], id: key });
        }
        dispatch(fetchOrderSuccess(fetchOrder));
      })
      .catch((err) => {
        dispatch(fetchOrderFailed(err));
      });
  };
};
