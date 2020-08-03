import React from "react";
import { connect } from "react-redux";
import { getMovie } from "../../Actions";
import FilmRecommendation from "./RecommendationFilms";
import Preloader from "./Preloader";
import Search from './Search'
import '../../Styles/Common.css';
import PropTypes from 'prop-types';

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

  getPosterPath = (path) => {
    if (path) {
      return "https://image.tmdb.org/t/p/w500" + path;
    }
  };

  render = () => {
    const { loaded, movie, match } = this.props;
    const { getPosterPath } = this;
    
    return (
      <>
        <Search />
        <div className="row">
          <div className="col-md-3" />

          <div className="col-md-6">
            <div style={{ padding: "10px" }}>
              <div className="card border-primary mb-3">
                <div
                  className="card-header mx-auto d-block"
                  style={{
                    backgroundImage: "url(" + getPosterPath(movie.backdrop_path) + ")",
                    backgroundSize: "cover"
                  }}
                >
                  <h5 className="card border-primary film-page-title mb-3">
                    {movie.original_title}
                  </h5>
                  {
                    !loaded ? (
                      <Preloader
                        preLoaderStyle={''}
                        isFilter={false}
                      />
                    ) : (
                        <div className="film-page-poster">
                          <img
                            className="film-page-poster-img"
                            alt="poster"
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          />

                          <div className="card border-primary film-page-info mb-3">
                            <div className="badge badge-secondary text-center">
                              Popularity: {movie.popularity}
                            </div>
                            <h3>{movie.tagline}</h3>
                            <h5>Description: {movie.overview}</h5>
                            <h5>Year: {movie.release_date}</h5>
                          </div>
                        </div>
                      )
                  }
                </div>
                <FilmRecommendation movieId={match.params.id} />
              </div>
            </div>
          </div>
          <div className="col-md-3" />
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
  }
});

FilmPage.propTypes = {
  loaded: PropTypes.bool.isRequired,
  movie: PropTypes.object,
  match: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(FilmPage);
