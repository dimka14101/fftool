import axios from "../Helpers/axios.public";
import {
  RECOM_REQ,
  RECOM_RES,
  RECOM_ERR,
  POSTS_REQ,
  POSTS_RES,
  POSTS_ERR,
  MOVIE_REQ,
  MOVIE_RES,
  MOVIE_ERR,
} from "../Constants";

export const getPosts = (dispatch) => {
  dispatch({ type: POSTS_REQ });
  axios
    .get("/movie/top_rated")
    .then((res) => {
      console.log(res);
      dispatch({ type: POSTS_RES, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: POSTS_ERR, error: err });
    });
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

export const getMovieRecommendationFilms = (dispatch) => {
  dispatch({ type: RECOM_REQ });
  axios
    .get("/movie/200/recommendations")
    .then((res) => {
      console.log(res);
      dispatch({ type: RECOM_RES, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: RECOM_ERR, error: err });
    });
};
