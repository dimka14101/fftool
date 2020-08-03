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
import invokeRequest from "../Helpers/invokeRequest"

export const getMovies = (pageId) => (dispatch) => {
    const uri = `/movie/top_rated?page=${pageId}`;
    invokeRequest.GET(uri,
        MOVIES_REQ,
        MOVIES_RES,
        MOVIES_ERR,
        dispatch);
};

export const getTopMovies = (dispatch) => {
    const uri = `/movie/upcoming`;
    invokeRequest.GET(uri,
        TOP_MOVIES_REQ,
        TOP_MOVIES_RES,
        TOP_MOVIES_ERR,
        dispatch);
};

export const getGenres = (dispatch) => {
    const uri = `/genre/movie/list`;
    invokeRequest.GET(uri,
        GENRES_REQ,
        GENRES_RES,
        GENRES_ERR,
        dispatch);
};

export const filterByGenre = (genres, pageId) => (dispatch) => {
    const uri = `/discover/movie?sort_by=popularity.desc&with_genres=${genres}&page=${pageId}`;
    invokeRequest.GET(uri,
        BY_GENRES_REQ,
        BY_GENRES_RES,
        BY_GENRES_ERR,
        dispatch);
};

export const clearFilterMovies = (dispatch) => {
    dispatch({ type: BY_GENRES_CLEAR });
};

export const getMovie = (movieId) => (dispatch) => {
    const uri = `/movie/${movieId}`;
    invokeRequest.GET(uri,
        MOVIE_REQ,
        MOVIE_RES,
        MOVIE_ERR,
        dispatch);
};

export const getMovieRecommendationFilms = (movieId) => (dispatch) => {
    const uri = `/movie/${movieId}/recommendations`;
    invokeRequest.GET(uri,
        RECOM_REQ,
        RECOM_RES,
        RECOM_ERR,
        dispatch);
};

