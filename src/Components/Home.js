import React, { Component } from "react";

import { FilterPanel, MoviesList, TopMoviesPanel } from "./MainContainer";
import Search from './Common/Search'

class Home extends Component {

    render = () => {
        return (
            <div>
                <Search/>
                <div className="row">
                    <div className="col-md-1"/>
                    <div className="col-md-2">
                        <FilterPanel />
                    </div>
                    <div className="col-md-6">
                        <MoviesList />
                    </div>
                    <div className="col-md-2">
                        <TopMoviesPanel />
                    </div>
                    <div className="col-md-1"/>
                </div>
            </div>
        );
    };
}

export default Home;
