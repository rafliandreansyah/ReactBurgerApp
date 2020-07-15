import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    tokenId: token,
    userId: userId,
  };
};

export const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_FAILED,
    error: error,
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const authLogout = (expiredTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expiredTime * 1000);
  };
};

export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());
    const requestData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA1ofl7abdfkVau1as-n_ej7-tJ4IB0ky8";
    if (!isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA1ofl7abdfkVau1as-n_ej7-tJ4IB0ky8";
    }
    axios
      .post(url, requestData)
      .then((response) => {
        console.log(response.data);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(authLogout(response.data.expiresIn));
      })
      .catch((err) => {
        console.log(err);
        dispatch(authFailed(err.response.data.error));
      });
  };
};
