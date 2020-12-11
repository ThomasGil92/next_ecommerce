export const SET_ADMIN = "SET_ADMIN";

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

export const clearAdmin=()=>(dispatch)=>{
    if(process.browser){
        dispatch({
            type:SET_ADMIN,
            payload:''
        })
    }
}
