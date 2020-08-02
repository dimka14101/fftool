import React from "react";
import { connect } from "react-redux";
import { getMovieRecommendationFilms } from "../../Actions";
import { NavLink } from "react-router-dom";
import Preloader from "./Preloader";

class FilmRecommendation extends React.Component {
  componentDidMount = () => {
    this.props.getPostsRecommendationFilmsAction(this.props.movieId);
  };

  render = () => {
    const { loaded, movies } = this.props;
    return (
      <>
        <div className="card-header">
          <div style={{ padding: "10px" }}>
            <h5
              className="card border-primary mb-3"
              style={{ textAlign: "center", padding: "10px" }}
            >
              Films recommendation
            </h5>
            {!loaded ? (
              <Preloader />
            ) : (
              <div class="row row-cols-1 row-cols-md-6">
                {movies.results.map((item) => (
                  <NavLink key={item.id} to={`/${item.id}`}>
                    <div key={item.id} class="col mb-4">
                      <div class="card h-100">
                        <img
                          class="card-img-top"
                          alt="poster"
                          src={
                            "https://image.tmdb.org/t/p/w500" + item.poster_path
                          }
                        ></img>
                        <div class="card-body">
                          <p class="card-title"> {item.original_title}</p>
                        </div>
                      </div>
                    </div>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </div>
      </>
    );
  };
}

const mapStateToProps = (state) => ({
  movies: state.recommendationMovies.movies,
  loaded: state.recommendationMovies.recomMoviesLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  getPostsRecommendationFilmsAction: (movieId) => {
    dispatch(getMovieRecommendationFilms(movieId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FilmRecommendation);
