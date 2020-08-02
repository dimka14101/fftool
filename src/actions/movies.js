import axios from "../Helpers/axios.public";
import {
  GENRES_REQ,
  GENRES_RES,
  GENRES_ERR, //Genres
  MOVIES_REQ,
  MOVIES_RES,
  MOVIES_ERR, //main page movies
  RECOM_REQ,
  RECOM_RES,
  RECOM_ERR, //recomendations for movie
  MOVIE_REQ,
  MOVIE_RES,
  MOVIE_ERR, //one movie
  BY_GENRES_REQ,
  BY_GENRES_RES,
  BY_GENRES_ERR,
  BY_GENRES_CLEAR, //movies by genre
  TOP_MOVIES_REQ,
  TOP_MOVIES_RES,
  TOP_MOVIES_ERR, //top movies
} from "../Constants";

export const getMovies = (pageId) => (dispatch) => {
  dispatch({ type: MOVIES_REQ });
  axios
    .get("/movie/top_rated?page=" + pageId)
    .then((res) => {
      console.log(res);
      dispatch({ type: MOVIES_RES, payload: res.data.results });
    })
    .catch((err) => {
      dispatch({ type: MOVIES_ERR, error: err });
    });
};

export const getTopMovies = (dispatch) => {
  dispatch({ type: TOP_MOVIES_REQ });
  axios
    .get("/movie/upcoming")
    .then((res) => {
      console.log(res);
      dispatch({ type: TOP_MOVIES_RES, payload: res.data.results });
    })
    .catch((err) => {
      dispatch({ type: TOP_MOVIES_ERR, error: err });
    });
};

export const getGenres = (dispatch) => {
  dispatch({ type: GENRES_REQ });
  axios
    .get("/genre/movie/list")
    .then((res) => {
      console.log(res);
      dispatch({ type: GENRES_RES, payload: res.data.genres });
    })
    .catch((err) => {
      dispatch({ type: GENRES_ERR, error: err });
    });
};

export const filterByGenre = (genres, pageId) => (dispatch) => {
  console.log("genre ", genres);
  dispatch({ type: BY_GENRES_REQ });
  axios
    .get(
      "/discover/movie?sort_by=popularity.desc&with_genres=" +
        genres +
        "&page=" +
        pageId
    )
    .then((res) => {
      console.log(res);
      dispatch({ type: BY_GENRES_RES, payload: res.data.results });
    })
    .catch((err) => {
      dispatch({ type: BY_GENRES_ERR, error: err });
    });
};

export const clearFilterMovies = (dispatch) => {
  dispatch({ type: BY_GENRES_CLEAR });
};

export const getMovie = (movieId) => (dispatch) => {
  dispatch({ type: MOVIE_REQ });
  axios
    .get("/movie/" + movieId)
    .then((res) => {
      console.log(res);
      dispatch({ type: MOVIE_RES, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: MOVIE_ERR, error: err });
    });
};

export const getMovieRecommendationFilms = (movieId) => (dispatch) => {
  dispatch({ type: RECOM_REQ });
  axios
    .get(`/movie/${movieId}/recommendations`)
    .then((res) => {
      console.log(res);
      dispatch({ type: RECOM_RES, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: RECOM_ERR, error: err });
    });
};
