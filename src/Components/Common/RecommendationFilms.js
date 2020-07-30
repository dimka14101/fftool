import React from "react";
import { connect } from "react-redux";
import { getMovieRecommendationFilms } from "../../Actions";
import style from "./FilmPage.module.css";

class FilmRecommendation extends React.Component {
  componentDidMount = () => {
    this.props.getPostsRecommendationFilmsAction();
  };

  render = () => {
    const { loaded, movies } = this.props;

    return (
      <>
        <div className={style.bloskRecom}>
          <div className={style.panelBody}>
            <h3 className={style.title}>Films recommendation</h3>
            {!loaded ? (
              <h2> Loading ... </h2>
            ) : (
              <div id={style.recomFilm}>
                {movies.results.map((item) => (
                  <div key={item.id} className={style.descriptionMovise}>
                    <img
                      className={style.recomList}
                      alt="poster"
                      src={"https://image.tmdb.org/t/p/w500" + item.poster_path}
                    ></img>
                    <h2> {item.original_title}</h2>
                    {/* <p>{item.overview}</p> */}
                  </div>
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
  getPostsRecommendationFilmsAction: () => {
    dispatch(getMovieRecommendationFilms);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FilmRecommendation);
