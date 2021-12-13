import {
    FETCH_POSTS_USER_STARTED,
    FETCH_POSTS_USER_SUCCESS,
    FETCH_POSTS_USER_FAILURE
} from '../types'
import axios from '../../../axios'

export const fetchPostsUser = (id) => {
    return dispatch => {
        dispatch(fetchPostsStarted());
        const token = localStorage.getItem('token')
        axios.get(`/posts/c/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                let posts = res.data.posts;
                dispatch(fetchPostsUserSuccess(posts));
            })
            .catch(error => {
                dispatch(fetchPostsUserFailure(error.response));
            });
    }
}

const fetchPostsStarted = () => {
    return {
        type: FETCH_POSTS_USER_STARTED
    }
}

const fetchPostsUserSuccess = (posts) => {
    return {
        type: FETCH_POSTS_USER_SUCCESS,
        payload: {
            posts
        }
    }
}

const fetchPostsUserFailure = (error) => {
    return {
        type: FETCH_POSTS_USER_FAILURE,
        payload: {
            error
        }
    }
}