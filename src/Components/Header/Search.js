import React, { Component } from "react";
import { getMoviesBySearch } from "../../Actions";
import { connect } from "react-redux";

class Search extends Component {
  getBySearch = (e) => {
    const query = e.target.value.toLowerCase();
    if (query && query.length > 2) {
      this.props.getMoviesBySearchAction(query);
    }
  };

  render() {
    const { getBySearch } = this;
    return (
      <div style={{ textAlign: "center" }} className="classHeader">
        <input onChange={getBySearch} placeholder="text"></input>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  movie: state.movie.movie,
  loaded: state.movie.movieLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  getMoviesBySearchAction: (query) => {
    dispatch(getMoviesBySearch(query));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
