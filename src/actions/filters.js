import invokeRequest from "../Helpers/invokeRequest"
import { SEARCH_MOVIES_REQ, SEARCH_MOVIES_RES, SEARCH_MOVIES_ERR } from "../Constants";

export const getMoviesBySearch = (query,pageId) => (dispatch) => {
  const uri = `/search/movie?query=${query}&page=${pageId}`;
  invokeRequest.GET(uri, SEARCH_MOVIES_REQ, SEARCH_MOVIES_RES, SEARCH_MOVIES_ERR, dispatch);
};