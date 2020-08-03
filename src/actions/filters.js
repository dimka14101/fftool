import axios from "../Helpers/axios.public";
import { SEARCH_MOVIES_REQ, SEARCH_MOVIES_RES, SEARCH_MOVIES_ERR } from "../Constants";

export const getMoviesBySearch = (query,pageId) => (dispatch) => {
  dispatch({ type: SEARCH_MOVIES_REQ });
  axios
    .get(`/search/movie?query=` + query+'&page='+pageId)
    .then((res) => {
      console.log(res);
      dispatch({ type: SEARCH_MOVIES_RES, payload: res.data.results });
    })
    .catch((err) => {
      dispatch({ type: SEARCH_MOVIES_ERR, error: err });
    });
};
