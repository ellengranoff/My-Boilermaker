import axios from "axios";

//ACTION TYPES
const GET_USER = "GET_USER";
const REMOVE_USER = "REMOVE_USER";

//ACTION CREATORS
const gotMe = (user) => ({
  type: GET_USER,
  user,
});

const loggedOutUser = () => ({ type: REMOVE_USER });

//THUNK CREATORS

export const getMe = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/auth/me");
      dispatch(gotMe(response.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const logIn = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put("/auth/login", formData);
      dispatch(gotMe(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const signUp = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/auth/signup", formData);
      console.log(data);
      dispatch(gotMe(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const logOut = () => {
  return async (dispatch) => {
    try {
      await axios.post("/auth/logout");
      dispatch(loggedOutUser());
      // history.push("/");
    } catch (error) {
      console.error(error);
    }
  };
};

//INITIAL STATE
//const initialState = { user: {} };

//REDUCER
const reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.user,
      };
    case REMOVE_USER:
      return {
        ...state,
        user: {},
      };
    default:
      return state;
  }
};

export default reducer;
