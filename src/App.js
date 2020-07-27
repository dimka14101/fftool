import React from 'react';
import { Provider } from 'react-redux';
import store from '../src/redux/store';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { Home, Movie, PageNotFound } from './Components'
import './App.css';

const  App = () => {
  return (
    <Provider store={store}>
    <BrowserRouter>
            <nav>
                <Link to="/"> Home Page </Link>
            </nav>
            <Switch>
                <Route exact path="/" component={ Home }/>
                <Route exact  path="/:id" component={ Movie }/> 
                <Route component={ PageNotFound }/> 
            </Switch>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
