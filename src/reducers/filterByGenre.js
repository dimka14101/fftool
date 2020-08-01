import {
    BY_GENRES_REQ, BY_GENRES_RES, BY_GENRES_ERR, BY_GENRES_CLEAR
} from '../Constants';

const initialState = {

    moviesByGenre: [],
    moviesByGenreLoaded: false,
    moviesByGenreError: []

}

const filterByGenresReducer = ( state = initialState, action ) => {
    switch( action.type ){

        case BY_GENRES_REQ:
            return({
                ...state,
                moviesByGenreLoaded: false
            });
        
        case BY_GENRES_RES:
            return({
                ...state,
                moviesByGenreLoaded: true,
                moviesByGenre: action.payload
            });

        case BY_GENRES_ERR: 
            return({
                ...state,
                moviesByGenreError: [...state.moviesByGenreError, action.error ]
            });

        case BY_GENRES_CLEAR:
            return initialState;
            
        default:
            return state;

    }
}

export default filterByGenresReducer;