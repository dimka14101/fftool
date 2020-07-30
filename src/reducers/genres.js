import {
    GENRES_REQ, GENRES_RES, GENRES_ERR
} from '../Constants';

const initailState = {

    genres: [],
    genresLoaded: false,
    genresError: []

}

const genresReducer = ( state = initailState, action ) => {
    switch( action.type ){

        case GENRES_REQ:
            return({
                ...state,
                genresLoaded: false
            });
        
        case GENRES_RES:
            return({
                ...state,
                genresLoaded: true,
                genres: action.payload
            });

        case GENRES_ERR: 
            return({
                ...state,
                genresError: [...state.genresError, action.error ]
            });

        default:
            return state;

    }
}

export default genresReducer;