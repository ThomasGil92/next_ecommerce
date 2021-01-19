export const SET_ADMIN = "SET_ADMIN";
export const SET_USER = "SET_USER";
export const SET_CART = "SET_CART";
export const CLEAR_CART = "CLEAR_CART";

export const setAdmin = () => (dispatch) => {
  if (process.browser) {
    if (sessionStorage.getItem("master")) {
      dispatch({
        type: SET_ADMIN,
        payload: JSON.parse(sessionStorage.getItem("master")),
      });
    }
    if (sessionStorage.getItem("admin")) {
      dispatch({
        type: SET_ADMIN,
        payload: JSON.parse(sessionStorage.getItem("admin")),
      });
    }
  }
};
export const setUser = () => (dispatch) => {
  if (process.browser) {
    if (sessionStorage.getItem("user")) {
      dispatch({
        type: SET_USER,
        payload: JSON.parse(sessionStorage.getItem("user")),
      });
    }
  }
};

export const setCart = () => (dispatch) => {
  if (localStorage.getItem("cart")) {
    dispatch({
      type: SET_CART,
      payload: JSON.parse(localStorage["cart"]),
    });
  }
};

export const clearCart = () => (dispatch) => {
    dispatch({
      type: CLEAR_CART,
      payload:''
    });
};

export const clearAdmin = () => (dispatch) => {
  if (process.browser) {
    dispatch({
      type: SET_ADMIN,
      payload: "",
    });
  }
};
export const clearUser = () => (dispatch) => {
  if (process.browser) {
    dispatch({
      type: SET_USER,
      payload: "",
    });
  }
};
