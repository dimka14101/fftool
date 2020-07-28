import React, { Component } from "react";
import { connect } from "react-redux";
import { getPosts } from "../../Actions";

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
              <ul>
                {/* posts.map( item => (
                                        <li key={item.id}>{item.title}</li>
                                    ))*/}
              </ul>
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
