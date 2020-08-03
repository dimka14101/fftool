import React from "react";
import { Provider } from "react-redux";
import store from "../src/Redux/store";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home, Movie, PageNotFound, SearchPage } from "./Components";
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/:id" component={Movie} />
          <Route exact path="/search/:query" component={SearchPage} />
          <Route component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
