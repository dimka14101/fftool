import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { Home, Movie, PageNotFound } from './Components'
import './App.css';

const  App = () => {
  return (
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
  );
}

export default App;
