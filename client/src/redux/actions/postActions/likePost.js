import { LIKE_POST_SUCCESS, LIKE_POST_FAILURE } from "../types";
import axios from "../../../axios";

export const likePost = (id) => {
    const options = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    };
    return dispatch => {
        axios.get(`/posts/${id}/likePost`, options)
            .then(res => {
                let successPost = res.data;
                dispatch(likePostsSuccess(successPost))
            })
            .catch(err => {
                let error = err.response;
                dispatch(likePostsFailure(error));
            });
    }
};

const likePostsSuccess = (id, successPost) => {
    return {
        type: LIKE_POST_SUCCESS,
        payload: {
            id,
            successPost
        }
    };
};

const likePostsFailure = error => {
    return {
        type: LIKE_POST_FAILURE,
        payload: {
            error
        }
    };
};