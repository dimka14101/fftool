import { combineReducers } from "redux";
import recommendationMovies from "./recommendations";
import movies from "./movies";
import movie from "./movie";
import genres from './genres';
import moviesByGenre from './filterByGenre'
import topMovies from './topMovies'
import searchByQuery from './searchByQuery'

const rootReducer = combineReducers({
  movies,
  recommendationMovies,
  movie,
  genres,
  moviesByGenre,
  topMovies,
  searchByQuery
});

export default rootReducer;
