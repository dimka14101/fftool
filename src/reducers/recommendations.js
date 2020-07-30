import { RECOM_REQ, RECOM_RES, RECOM_ERR } from "../Constants";

const initialState = {
  movies: [],
  recomMoviesLoaded: false,
  recomMoviesError: [],
};

const recommendationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECOM_REQ:
      return {
        ...state,
        recomMoviesLoaded: false,
      };

    case RECOM_RES:
      return {
        ...state,
        recomMoviesLoaded: true,
        movies: action.payload,
      };

    case RECOM_ERR:
      return {
        ...state,
        recomMoviesError: [...state.recomMoviesError, action.error],
      };
    default:
      return state;
  }
};

export default recommendationsReducer;
