import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { getMovies } from "../../Actions";

class MoviesList extends Component {
  componentDidMount = () => {
    this.props.getMoviesAction();
  };

  render = () => {
    const { loaded, movies } = this.props;

    return (
      <>
        <div className="panel">
          <div className="panel-heading"></div>
          <div className="panel-body">
            <h3> MoviesList </h3>
            {!loaded ? (
              <h2> Loading ... </h2>
            ) : (
                <>
                  {movies.map((item) => (
                    <NavLink movieId={item.id} key={item.id} to={`/${item.id}`}>
                      <li>{item.title}</li>
                      <img
                        style={{ width: 200, height: 250 }}
                        alt="poster"
                        src={"https://image.tmdb.org/t/p/w500" + item.poster_path}
                      ></img>
                    </NavLink>
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
  movies: state.movies.movies,
  loaded: state.movies.moviesLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  getMoviesAction: () => {
    dispatch(getMovies);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);
