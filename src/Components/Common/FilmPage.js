import React from "react";
import { connect } from "react-redux";
import { getMovie } from "../../Actions";
import FilmRecommendation from "./RecommendationFilms";
import style from "./FilmPage.module.css";

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
        <div className={style.blockFilm}>
          <div className="panel-body">
            <h3 className={style.title}> MoviesPage </h3>
            {!loaded ? (
              <h2> Loading ... </h2>
            ) : (
              <div className={style.filmContainer}>
                <img
                  className={style.imgPhoto}
                  alt="poster"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                ></img>
                <div className={style.descriptionFilm}>
                  <h3>{movie.tagline}</h3>
                  <h4>{movie.original_title}</h4>
                  <h5>{movie.overview}</h5>
                  <div>{movie.release_date}</div>
                  <div>{movie.popularity}</div>
                </div>
              </div>
            )}
          </div>
          <FilmRecommendation movieId={match.params.id} />
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
