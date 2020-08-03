import React, { Component } from "react";
import { connect } from "react-redux";
import { getGenres, filterByGenre, clearFilterMovies } from "../../Actions";
import { NavLink } from "react-router-dom";
import moviePoster404 from '../../Images/moviePoster404.png';
import '../../Styles/MainContainer.css';
import PreLoader from '../Common/Preloader';
import PropTypes from 'prop-types';

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

        if (this.pageId >= 1000 && this.pageId <= 0) {
            return;
        }

        this.props.getByGenreAction(this.selectedGenreId, this.pageId);
    }

    getPreviousPageByGenresAction = () => {
        window.scrollTo(0, 0);
        this.pageId--;
        this.recalculatePages();

        if (this.pageId >= 1000 && this.pageId <= 0) {
            return;
        }

        this.props.getByGenreAction(this.selectedGenreId, this.pageId);
    }

    getPosterPath = (path) => {
        if (path) {
            return "https://image.tmdb.org/t/p/w500" + path;
        }
        return moviePoster404;
    }

    render = () => {
        const {
            loaded,
            genres,
            byGenreLoaded,
            byGenreMovies
        } = this.props;

        const {
            getByGenresAction,
            getPosterPath,
            getNextPageByGenresAction,
            getPreviousPageByGenresAction,
            nextPageId,
            previousPageId
        } = this;

        return (
            <>
                <div className="panel">
                    <div className="panel-heading" />
                    <div className="panel-body">
                        <h3> Filter </h3>
                        {
                            !loaded ? (<></>) : (
                                <div>
                                    <select
                                        id="genres"
                                        name="genres"
                                        className='genre-dropdown'
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
                                <PreLoader
                                    preLoaderStyle={'genre-preloader'}
                                    isFilter={true}
                                />
                            ) : (
                                    <>
                                        {
                                            byGenreMovies.map((item) => (
                                                <div key={item.id}
                                                    className="genre-movie-container card border-primary"
                                                >
                                                    <div className="media">
                                                        <img
                                                            className="genre-filter-movie-poster mr-3"
                                                            alt="poster"
                                                            src={getPosterPath(item.poster_path)}
                                                        />
                                                        <div className="media-body">
                                                            <NavLink to={`/${item.id}`}>
                                                                <p className="genre-filter-movie-name mt-0" >
                                                                    {item.title + '(' + item.release_date + ')'}
                                                                </p>
                                                            </NavLink>
                                                            <div className="genre-filter-movie-overview text-justify">
                                                                {item.overview}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        {
                                            this.selectedGenreId !== '' ? (
                                                //TODO: can be moved to separate component
                                                <div className="d-flex justify-content-center">
                                                    {
                                                        previousPageId >= 1 ? (
                                                            <button
                                                                type="button"
                                                                className="genre-filter-pagination-btn btn btn-md btn-primary"
                                                                onClick={getPreviousPageByGenresAction}
                                                            >
                                                                Previous Page ({previousPageId})
                                                            </button>
                                                        ) : (<></>)
                                                    }
                                                    <br></br>
                                                    {
                                                        byGenreMovies.length > 0 ? (
                                                            <button
                                                                type="button"
                                                                className="genre-filter-pagination-btn btn btn-md btn-primary"
                                                                onClick={getNextPageByGenresAction}
                                                            >
                                                                Next Page ({nextPageId})
                                                         </button>
                                                        ) : (<></>)
                                                    }
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
    genres: state.genres.genres.genres,
    loaded: state.genres.genresLoaded,
    byGenreMovies: state.moviesByGenre.moviesByGenre.results,
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

FilterPanel.propTypes = {
    loaded: PropTypes.bool.isRequired,
    genres: PropTypes.array,
    byGenreLoaded: PropTypes.bool.isRequired,
    byGenreMovies: PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterPanel);
