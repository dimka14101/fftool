import { SEARCH_MOVIES_REQ, SEARCH_MOVIES_RES, SEARCH_MOVIES_ERR } from '../Constants';

const initialState = {
    moviesByQuery: [],
    moviesByQueryLoaded: false,
    moviesByQueryError: []
}

const searchByQueryReducer = ( state = initialState, action ) => {
    switch( action.type ){
        case SEARCH_MOVIES_REQ:
            return({
                ...state,
                moviesByQueryLoaded: false
            });
        case SEARCH_MOVIES_RES:
            return({
                ...state,
                moviesByQueryLoaded: true,
                moviesByQuery: action.payload
            });
        case SEARCH_MOVIES_ERR: 
            return({
                ...state,
                moviesByQueryError: [...state.moviesByQueryError, action.error ]
            });
        default:
            return state;
    }
}

export default searchByQueryReducer;