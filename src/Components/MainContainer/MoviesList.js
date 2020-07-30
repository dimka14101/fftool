import React, { Component } from "react";
import { connect } from "react-redux";
import { getPosts } from "../../Actions";
import { NavLink } from "react-router-dom";

class MoviesList extends Component {
  componentDidMount = () => {
    this.props.getPostsAction();
  };

  render = () => {
    const { loaded, posts } = this.props;

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
                {posts.results.map((item) => (
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
  posts: state.movies.posts,
  loaded: state.movies.posts_loaded,
});

const mapDispatchToProps = (dispatch) => ({
  getPostsAction: () => {
    dispatch(getPosts);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);
