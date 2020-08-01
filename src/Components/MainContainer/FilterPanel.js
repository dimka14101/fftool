import React, { Component } from "react";
import { connect } from "react-redux";
import { getGenres, filterByGenre, clearFilterMovies } from "../../Actions";
import { NavLink } from "react-router-dom";
import moviePoster404 from '../../Images/moviePoster404.png'

class FilterPanel extends Component {
    prefferedGenres = [];
    selectedGenreId = "";
    pageId = 1;
    nextPageId = 2;
    previousPageId = 0;

    componentDidMount = () => {
        this.props.getGenresAction(this.selectedGenreId, this.pageId);
    };

    getByGenresAction = () => (e) => {
        //temp block to search by 1 genre while checkboxes unavailable;
        this.prefferedGenres = [];

        const filterValue = e.target.value;
        if (filterValue === '') {
            this.props.clearFilterMoviesAction();
            return;
        }
        this.prefferedGenres.push(e.target.value);
        this.selectedGenreId = this.prefferedGenres.join();
        this.props.getByGenreAction(this.selectedGenreId, this.pageId);
    }

    recalculatePages = () => {
        this.nextPageId = this.pageId;
        this.nextPageId++;
        this.previousPageId = this.pageId;
        this.previousPageId--;
    }

    getNextPageByGenresAction = () => {
        window.scrollTo(0, 0);
        this.pageId++;
        this.recalculatePages();
        if (this.pageId >= 1000 && this.pageId <= 0)
            return;
            this.props.getByGenreAction(this.selectedGenreId, this.pageId);
    }

    getPreviousPageByGenresAction = () => {
        window.scrollTo(0, 0);
        this.pageId--;
        this.recalculatePages();
        if (this.pageId >= 1000 && this.pageId <= 0)
            return;
            this.props.getByGenreAction(this.selectedGenreId, this.pageId);
    }

    getPosterPath = (path) => {
        if (path) {
            return "https://image.tmdb.org/t/p/w500" + path;
        }
        return moviePoster404;
    }

    render = () => {
        const { loaded, genres } = this.props;
        const { byGenreLoaded, byGenreMovies } = this.props;
        const { getByGenresAction, getPosterPath } = this;
        const { getNextPageByGenresAction, getPreviousPageByGenresAction, nextPageId, previousPageId } = this;

        return (
            <>
                <div className="panel">
                    <div className="panel-heading"></div>
                    <div className="panel-body">
                        <h3> Filter </h3>
                        {
                            !loaded ? (
                                <h2> Loading ... </h2>
                            ) : (
                                
                                    <div>
                                        <select id="genres" name="genres"
                                            onChange={getByGenresAction()}
                                        >
                                            <option
                                                            key={0}
                                                            value={''}
                                                            defaultValue>
                                                            ---------
                                                        </option>
                                            {
                                                genres.map(item => {
                                                    return (
                                                        <option
                                                            key={item.id}
                                                            value={item.id}
                                                        >
                                                            {item.name}
                                                        </option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                )
                        }
                        {
                            !byGenreLoaded ? (
                                <h2> Select Genre ... </h2>
                            ) : (
                                    <>
                                        {byGenreMovies.map((item) => (
                                            <div key={item.id} className="card border-primary" style={{ width: '100%', margin: '1%' }}>
                                                <div className="media">
                                                    <img className="mr-3" style={{ width: '30%', height: 'auto' }}
                                                        alt="poster"
                                                        src={getPosterPath(item.poster_path)} />
                                                    <div className="media-body">
                                                        <NavLink to={`/${item.id}`}>
                                                            <p className="mt-0" style={{ fontSize: '12px', margin: 0 }} >{item.title + '(' + item.release_date + ')'}</p>
                                                        </NavLink>
                                                    </div>
                                                </div>
                                            </div>

                                        ))}
                                        { this.selectedGenreId !== '' ? (
                                        <div className="d-flex justify-content-center">
                                            {previousPageId >= 1 ? (
                                                <button type="button" className="btn btn-md btn-primary" onClick={getPreviousPageByGenresAction} style={{ width: '30%', margin: '1%' }}>Previous Page ({previousPageId})</button>
                                            ) : (
                                                    <></>
                                                )
                                            }
                                            <br></br>
                                            <button type="button" className="btn btn-md btn-primary" onClick={getNextPageByGenresAction} style={{ width: '30%', margin: '1%' }}>Next Page ({nextPageId})</button>
                                        </div>
                                        ) : (<></>)
                                        }
                                    </>
                                )
                        }
                    </div>
                </div>
            </>
        );
    }
};

const mapStateToProps = (state) => ({
    genres: state.genres.genres,
    loaded: state.genres.genresLoaded,
    byGenreMovies: state.moviesByGenre.moviesByGenre,
    byGenreLoaded: state.moviesByGenre.moviesByGenreLoaded
});

const mapDispatchToProps = (dispatch) => ({
    getGenresAction: () => {
        dispatch(getGenres);
    },
    getByGenreAction: (selectedGenreId, pageId) => {
        dispatch(filterByGenre(selectedGenreId, pageId))
    },
    clearFilterMoviesAction: () => {
        dispatch(clearFilterMovies);
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(FilterPanel);
