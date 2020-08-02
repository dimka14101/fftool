import React from "react";
import { connect } from "react-redux";
import { getMovie } from "../../Actions";
import FilmRecommendation from "./RecommendationFilms";
import Preloader from "./Preloader";

class FilmPage extends React.Component {
  refreshProfile() {
    this.props.getPostsAction(this.props.match.params.id);
  }

  componentDidMount = () => {
    this.refreshProfile();
  };

  componentDidUpdate(prevProps, prevState) {
    window.scrollTo(0, 0);
    if (this.props.match.params.id !== prevProps.match.params.id)
      this.refreshProfile();
  }

  render = () => {
    const { loaded, movie, match } = this.props;
    return (
      <>
        <div style={{ padding: "10px" }}>
          <div className="card border-primary mb-3">
            <div
              className="card-header"
              style={{
                backgroundImage: `url("https://image.tmdb.org/t/p/w500${movie.backdrop_path}")`,
                backgroundSize: "cover",
              }}
            >
              <h5
                className="card border-primary mb-3"
                style={{ textAlign: "center", padding: "10px", opacity: 0.8 }}
              >
                MoviesPage
              </h5>
              {!loaded ? (
                <Preloader />
              ) : (
                <div
                  style={{
                    display: "flex",
                    paddingBottom: "20px",
                  }}
                >
                  <img
                    style={{
                      width: "33%",
                      paddingLeft: "50px",
                      paddingRight: "20px",
                    }}
                    alt="poster"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  ></img>

                  <div
                    className="card border-primary mb-3"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "30px",
                      opacity: 0.8,
                    }}
                  >
                    <h3>{movie.original_title}</h3>
                    <h3>{movie.tagline}</h3>
                    <h5>Description: {movie.overview}</h5>
                    <h5>Year: {movie.release_date}</h5>
                    <div className="badge badge-secondary text-center">
                      Popularity: {movie.popularity}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <FilmRecommendation movieId={match.params.id} />
          </div>
        </div>
      </>
    );
  };
}

const mapStateToProps = (state) => ({
  movie: state.movie.movie,
  loaded: state.movie.movieLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  getPostsAction: (movieId) => {
    dispatch(getMovie(movieId));
  },
  // getPostsRecomAction: (movieRecomId) => {
  //   dispatch(getMovieRecommendationFilms(movieRecomId));
  // },
});

export default connect(mapStateToProps, mapDispatchToProps)(FilmPage);
