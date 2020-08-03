import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { getTopMovies } from "../../Actions";
import PreLoader from "../Common/Preloader";
import moviePoster404 from "../../Images/moviePoster404.png";
import '../../Styles/MainContainer.css';
import PropTypes from 'prop-types';

class TopMoviesPanel extends Component {
  componentDidMount = () => {
    this.props.getTopMoviesAction();
  };

  getPosterPath = (path) => {
    if (path) {
      return "https://image.tmdb.org/t/p/w500" + path;
    }
    return moviePoster404;
  };

  render = () => {
    const { topMoviesLoaded, topMovies } = this.props;
    const { getPosterPath } = this;

    return (
      <>
        <div className="panel">
          <div className="panel-heading" />
          <div className="panel-body">
            <h3> Upcoming </h3>
            {
              !topMoviesLoaded ? (
                <PreLoader
                  preLoaderStyle={"rounded  top-movies-preloader  mx-auto d-block"}
                  isFilter={false}
                />
              ) : (
                  <>
                    {
                      topMovies.map((item) => (

                        <div
                          key={item.id}
                          className="card border-primary top-movies-container"
                        >
                          <img
                            className="card-img-top top-movies-poster"
                            alt="poster"
                            src={getPosterPath(item.poster_path)}
                          />
                          <div className="card-body">
                            <NavLink to={`/${item.id}`}>
                              <p className="text-center font-weight-bold top-movie-name">
                                {item.title + ' (' + item.release_date + ')'}
                              </p>
                            </NavLink>
                          </div>
                        </div>
                      ))}
                  </>
                )}
          </div>
        </div>
      </>
    );
  };
}

const mapStateToProps = (state) => ({
  topMovies: state.topMovies.topMovies.results,
  topMoviesLoaded: state.topMovies.topMoviesLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  getTopMoviesAction: () => {
    dispatch(getTopMovies);
  },
});

TopMoviesPanel.propTypes = {
  topMoviesLoaded: PropTypes.bool.isRequired,
  topMovies: PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(TopMoviesPanel);
