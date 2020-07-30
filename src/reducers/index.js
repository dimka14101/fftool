import { combineReducers } from "redux";
import recommendationMovies from "./recommendations";
import movies from "./movies";
import movie from "./movie";
import genres from './genres';

const rootReducer = combineReducers({
  movies,
  recommendationMovies,
  movie,
  genres
});

export default rootReducer;
