import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { getMoviesBySearch } from "../../Actions";
import mainLogo from '../../Images/mainLogo.png';
import moviePoster404 from '../../Images/moviePoster404.png'
import '../../Styles/Common.css';
import PreLoader from "../Common/Preloader";
import PropTypes from 'prop-types';

class SearchMoviesList extends Component {
  pageId = 1;
  nextPageId = 2;
  previousPageId = 0;
  searchQuery = '';

  componentDidMount = () => {
    if (this.searchQuery === this.props.match.params.query) {
      return;
    }

    this.searchQuery = this.props.match.params.query;
    this.props.getMoviesByQueryAction(this.props.match.params.query, this.pageId);
  };

  recalculatePages = () => {
    this.nextPageId = this.pageId;
    this.nextPageId++;
    this.previousPageId = this.pageId;
    this.previousPageId--;
  }

  nextPage = () => {
    window.scrollTo(0, 0);
    this.pageId++;
    this.recalculatePages();

    if (this.pageId >= 1000 && this.pageId <= 0) {
      return;
    }

    this.props.getMoviesByQueryAction(this.searchQuery, this.pageId)
  }

  previousPage = () => {
    window.scrollTo(0, 0);
    this.pageId--;
    this.recalculatePages();

    if (this.pageId >= 1000 && this.pageId <= 0) {
      return;
    }

    this.props.getMoviesByQueryAction(this.searchQuery, this.pageId)
  }

  getBySearch = (e) => {
    const query = e.target.value.toLowerCase();

    if (e.keyCode === 13) {
      if (this.searchQuery === query) {
        this.props.getMoviesByQueryAction(this.searchQuery, this.pageId)
      } else {
        this.searchQuery = query;
        this.pageId = 1;
        this.nextPageId = 2;
        this.previousPageId = 0;
        this.props.getMoviesByQueryAction(this.searchQuery, 1)
      }
    }
  };

  getPosterPath = (path) => {
    if (path) {
      return "https://image.tmdb.org/t/p/w500" + path;
    }
    return moviePoster404;
  }

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
      getBySearch,
      getPosterPath
    } = this;

    return (
      <>
        <div className="panel">
          <div className="panel-heading"></div>
          <div className="panel-body">
            <div className="row">
              <div className="col-md-3" />
              <div className="col-md-6">
                <nav class="navbar navbar-light bg-light">
                  <a class="navbar-brand" href="/">
                    <img src={mainLogo} width="30" height="30" class="d-inline-block align-top" alt="poster" />
                    Home
                  </a>
                  <div className="seach-film-info input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      value={this.searchQuery}
                      onChange={getBySearch} placeholder="Enter at least 3 chars for search"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                    />
                  </div>
                </nav>
              </div>
              <div className="col-md-3" />
            </div>
            {
              !loaded ? (
                <PreLoader
                  preLoaderStyle={"rounded search-film-preloader mx-auto d-block"}
                  isFilter={false}
                />
              ) : (
                  <>
                    <div className="row">
                      <div className="col-md-3" />
                      <div className="col-md-6">
                        {
                          movies.map((item) => (
                            <div key={item.id} className="card border-primary mb-3">

                              <div className="card-header search-film-title">
                                <NavLink to={`/${item.id}`}>
                                  <p className="text-left">{item.title + ' (' + item.release_date + ')'}</p>
                                </NavLink>
                                <span className="badge badge-secondary search-film-score text-right">
                                  {item.popularity}
                                </span>
                              </div>
                              <div className="card-body text-primary media">
                                <img
                                  className="mr-3 search-film-poster"
                                  alt="poster"
                                  src={getPosterPath(item.poster_path)}
                                />
                                <div className="media-body">
                                  {item.overview}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                      <div className="col-md-3" />
                    </div>
                    <div className="d-flex justify-content-center">
                      {
                        previousPageId >= 1 ? (
                          //TODO: can be moved to separate component
                          <button
                            type="button"
                            className="btn btn-md search-film-pagination-btn btn-primary"
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
                            className="btn btn-md search-film-pagination-btn btn-primary"
                            onClick={nextPage} >
                            Next Page ({nextPageId})
                        </button>
                        ) : (<></>)
                      }
                    </div>
                  </>
                )
            }
          </div>
        </div>
      </>
    );
  };
}

const mapStateToProps = (state) => ({
  movies: state.searchByQuery.moviesByQuery.results,
  loaded: state.searchByQuery.moviesByQueryLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  getMoviesByQueryAction: (query, pageId) => {
    dispatch(getMoviesBySearch(query, pageId));
  },
});

SearchMoviesList.propTypes = {
  movies: PropTypes.array,
  loaded: PropTypes.bool.isRequired
}; 

export default connect(mapStateToProps, mapDispatchToProps)(SearchMoviesList);