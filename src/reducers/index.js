import { combineReducers } from "redux";
import recommendationMovies from "./recommendations";
import movies from "./movies";
import movie from "./movie";

const rootReducer = combineReducers({
  movies,
  recommendationMovies,
  movie,
});

export default rootReducer;
