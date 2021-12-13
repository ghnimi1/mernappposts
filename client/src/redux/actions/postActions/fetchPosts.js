import {
    FETCH_POSTS_STARTED,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAILURE
} from '../types'
import axios from '../../../axios'

export const fetchPosts = () => {
    return dispatch => {
        dispatch(fetchPostsStarted());
        axios.get('/posts/p')
            .then(res => {
                let posts = res.data.posts;
                dispatch(fetchPostsSuccess(posts));
            })
            .catch(error => {
                dispatch(fetchPostsFailure(error.response));
            });
    }
}

const fetchPostsStarted = () => {
    return {
        type: FETCH_POSTS_STARTED
    }
}

const fetchPostsSuccess = (posts) => {
    return {
        type: FETCH_POSTS_SUCCESS,
        payload: {
            posts
        }
    }
}

const fetchPostsFailure = (error) => {
    return {
        type: FETCH_POSTS_FAILURE,
        payload: {
            error
        }
    }
}