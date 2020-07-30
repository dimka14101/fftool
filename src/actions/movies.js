
import axios from '../Helpers/axios.public';
import {
    GENRES_REQ, GENRES_RES, GENRES_ERR, //Genres 
    MOVIES_REQ, MOVIES_RES, MOVIES_ERR,
    RECOM_REQ, RECOM_RES, RECOM_ERR,
    MOVIE_REQ, MOVIE_RES, MOVIE_ERR,
} from '../Constants';

export const getMovies = ( dispatch ) => {
    dispatch({ type: MOVIES_REQ });
    axios.get('/movie/top_rated')
        .then( res => {
            console.log( res );
            dispatch({ type: MOVIES_RES, payload: res.data.results });
        })
        .catch( err => {
            dispatch({ type: MOVIES_ERR, error: err });
        })
}

export const getGenres = ( dispatch ) => {
    dispatch({ type: GENRES_REQ });
    axios.get('/genre/movie/list')
        .then( res => {
            console.log( res );
            dispatch({ type: GENRES_RES, payload: res.data.genres });
        })
        .catch( err => {
            dispatch({ type: GENRES_ERR, error: err });
        })
}

export const filterByGenre = (genre) => ( dispatch ) => {
    console.log('genre ', genre);
    dispatch({ type: GENRES_REQ });
    axios.get('/genre/movie/list')
        .then( res => {
            console.log( res );
            dispatch({ type: GENRES_RES, payload: res.data.genres });
        })
        .catch( err => {
            dispatch({ type: GENRES_ERR, error: err });
        })
}

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