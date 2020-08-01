import axios from "../Helpers/axios.public";
import { MOVIES_REQ, MOVIES_RES, MOVIES_ERR } from "../Constants";

export const CLEAN_FILTER = "CLEAN_FILTER";
export const FILTER_USERS = "FILTER_USERS";

export const clearFilter = (dispatch, getState) => {
  dispatch({ type: CLEAN_FILTER });
};

export const applyFilters = (fruit) => (dispatch, getState) => {
  dispatch({ type: FILTER_USERS, payload: fruit });
};

export const getMoviesBySearch = (query) => (dispatch) => {
  dispatch({ type: MOVIES_REQ });
  axios
    .get(`/search/movie?query=` + query)
    .then((res) => {
      console.log(res);
      dispatch({ type: MOVIES_RES, payload: res.data.results });
    })
    .catch((err) => {
      dispatch({ type: MOVIES_ERR, error: err });
    });
};
