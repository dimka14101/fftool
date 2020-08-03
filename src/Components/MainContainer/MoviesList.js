import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { getMovies } from "../../Actions";
import moviePoster404 from "../../Images/moviePoster404.png";
import PreLoader from "../Common/Preloader";
import '../../Styles/MainContainer.css';
import PropTypes from 'prop-types';

class MoviesList extends Component {
  pageId = 1;
  nextPageId = 2;
  previousPageId = 0;

  componentDidMount = () => {
    this.props.getMoviesAction(this.pageId);
  };

  recalculatePages = () => {
    this.nextPageId = this.pageId;
    this.nextPageId++;
    this.previousPageId = this.pageId;
    this.previousPageId--;
  };

  nextPage = () => {
    window.scrollTo(0, 0);
    this.pageId++;
    this.recalculatePages();

    if (this.pageId >= 1000 && this.pageId <= 0) {
      return;
    }

    this.props.getMoviesAction(this.pageId);
  };

  previousPage = () => {
    window.scrollTo(0, 0);
    this.pageId--;
    this.recalculatePages();

    if (this.pageId >= 1000 && this.pageId <= 0) {
      return;
    }

    this.props.getMoviesAction(this.pageId);
  };

  getPosterPath = (path) => {
    if (path) {
      return "https://image.tmdb.org/t/p/w500" + path;
    }
    return moviePoster404;
  };

  render = () => {
    const {
      loaded,
      movies
    } = this.props;

    const {
      nextPage,
      previousPage,
      nextPageId,
      previousPageId,
      getPosterPath
    } = this;

    return (
      <>
        <div className="panel">
          <div className="panel-heading" />
          <div className="panel-body">
            <h3> Top rated </h3>
            {!loaded ? (
              <PreLoader
                preLoaderStyle={"rounded main-list-preloader mx-auto d-block"}
                isFilter={false}
              />
            ) : (
                <>
                  {
                    movies.map(item => (
                      <div
                        key={item.id}
                        className="card border-primary mb-3"
                      >
                        <div className="main-list-movie-header card-header">
                          <NavLink to={`/${item.id}`}>
                            <p className="text-left">
                              {item.title + " (" + item.release_date + ")"}
                            </p>
                          </NavLink>
                          <span className="main-list-score-hight badge badge-secondary text-right">
                            {item.popularity}
                          </span>
                        </div>

                        <div className="card-body text-primary media">
                          <img
                            className="mr-3 main-list-poster"
                            alt="poster"
                            src={getPosterPath(item.poster_path)}
                          />
                          <div className="media-body">
                            {item.overview}
                          </div>
                        </div>
                      </div>
                    ))}
                  <div className="d-flex justify-content-center">
                    {
                      previousPageId >= 1 ? (
                        //TODO: can be moved to separate component
                        <button
                          type="button"
                          className="btn btn-md btn-primary main-list-pagination-btn"
                          onClick={previousPage}
                        >
                          Previous Page ({previousPageId})
                        </button>
                      ) : (<></>)
                    }
                    <br></br>
                    {
                      movies.length > 0 ? (
                        <button
                          type="button"
                          className="btn btn-md btn-primary main-list-pagination-btn"
                          onClick={nextPage}
                        >
                          Next Page ({nextPageId})
                      </button>
                      ) : (<></>)
                    }
                  </div>
                </>
              )}
          </div>
        </div>
      </>
    );
  };
}

const mapStateToProps = state => ({
  movies: state.movies.movies.results,
  loaded: state.movies.moviesLoaded
});

const mapDispatchToProps = dispatch => ({
  getMoviesAction: pageId => {
    dispatch(getMovies(pageId));
  }
});

MoviesList.propTypes = {
  loaded: PropTypes.bool.isRequired,
  movies: PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);
