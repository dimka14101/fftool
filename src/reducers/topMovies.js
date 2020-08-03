import { TOP_MOVIES_REQ, TOP_MOVIES_RES, TOP_MOVIES_ERR } from '../Constants';

const initialState = {
    topMovies: [],
    topMoviesLoaded: false,
    topMoviesError: []
}

const topMoviesReducer = ( state = initialState, action ) => {
    switch( action.type ){
        case TOP_MOVIES_REQ:
            return({
                ...state,
                topMoviesLoaded: false
            });
        case TOP_MOVIES_RES:
            return({
                ...state,
                topMoviesLoaded: true,
                topMovies: action.payload
            });
        case TOP_MOVIES_ERR: 
            return({
                ...state,
                topMoviesError: [...state.topMoviesError, action.error ]
            });
        default:
            return state;
    }
}

export default topMoviesReducer;