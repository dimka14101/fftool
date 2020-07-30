import {
    MOVIES_REQ, MOVIES_RES, MOVIES_ERR
} from '../Constants';

const initialState = {

    movies: [],
    moviesLoaded: false,
    moviesError: []

}

const postsReducer = ( state = initialState, action ) => {
    switch( action.type ){

        case MOVIES_REQ:
            return({
                ...state,
                moviesLoaded: false
            });
        
        case MOVIES_RES:
            return({
                ...state,
                moviesLoaded: true,
                movies: action.payload
            });

        case MOVIES_ERR: 
            return({
                ...state,
                moviesError: [...state.moviesError, action.error ]
            });

        default:
            return state;

    }
}


export default postsReducer;