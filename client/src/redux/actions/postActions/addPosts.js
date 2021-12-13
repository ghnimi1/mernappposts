import { ADD_POST_SUCCESS, ADD_POST_FAILURE } from "../types";
import axios from "../../../axios";

export const addPosts = (post) => {
    const options = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'multipart/form-data'
        }
    };
    return dispatch => {
        axios.post('/posts/create', post, options)
            .then(res => {
                let successMessage = res.data;
                dispatch(addPostsSuccess(post, successMessage));
            })
            .catch(err => {
                let error = err.response;
                dispatch(addPostsFailure(error));
            });
    }
};

const addPostsSuccess = (post, successMessage) => {
    return {
        type: ADD_POST_SUCCESS,
        payload: {
            post,
            successMessage
        }
    };
};

const addPostsFailure = error => {
    return {
        type: ADD_POST_FAILURE,
        payload: {
            error
        }
    };
};