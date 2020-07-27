
import axios from '../helpers/axios.public';

export const POSTS_REQ = "POSTS_REQ";
export const POSTS_RES = "POSTS_RES";
export const POSTS_ERR = "POSTS_ERR";
export const CLEAR_POSTS = "CLEAR_POSTS";

export const getPosts = ( dispatch ) => {
    dispatch({ type: POSTS_REQ });
    axios.get(`/posts`)
        .then( res => {
            console.log( res );
            dispatch({ type: POSTS_RES, payload: res.data });
        })
        .catch( err => {
            dispatch({ type: POSTS_ERR, error: err });
        })
}

export const clearPosts = ( dispatch ) => {
    dispatch({ type: CLEAR_POSTS });
} 