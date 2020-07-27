import React, { Component } from 'react'

import { connect } from 'react-redux';

import { getPosts } from '../actions';

class Home extends Component{

    componentDidMount = () => {
        this.props.getPostsAction();
    }

    render = () => {

        const { loaded, posts } = this.props;
        return(
            <div>
                <h1> Posts </h1>
                {
                    !loaded ? 
                        (<h2> Loading ... </h2>) :
                        (
                            <ul>
                                {
                                    posts.map( item => (
                                        <li key={item.id}>{item.title}</li>
                                    ))
                                }
                            </ul>
                        )
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    posts: state.posts.posts,
    loaded: state.posts.posts_loaded
})

const mapDispatchToProps = (dispatch) => ({
    getPostsAction: () => {
        dispatch( getPosts );
    }
});



export default connect(mapStateToProps, mapDispatchToProps )(Home);