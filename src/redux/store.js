import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from '../reducers';

import { loadState, saveState } from '../helpers/localStorage'; 

const composeEnhancers = process.env.NODE_ENV !==
    'production' && typeof window !==
    'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const middlewares = applyMiddleware( thunk );

const preloadData = loadState();


let store = null;

if( preloadData ){
    store = createStore( reducers, preloadData, composeEnhancers(middlewares) );
} else {
    store = createStore( reducers, composeEnhancers(middlewares) );
}

store.subscribe( () => {
    let state = store.getState();
    saveState({
        posts: state.posts
    });
})

export default store;