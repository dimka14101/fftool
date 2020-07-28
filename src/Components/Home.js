import React, { Component } from 'react'

import { FilterPanel, MoviesList, TopMoviesPanel } from './MainContainer'

class Home extends Component{

    render = () => {
        return(
            <div>
                <h1> Movies  </h1>
                <div class="row">
                    <div class="col-md-3">
                        <FilterPanel/>
                    </div>
                    <div class="col-md-6">
                        <MoviesList/>
                    </div>
                    <div class="col-md-3">
                        <TopMoviesPanel/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;