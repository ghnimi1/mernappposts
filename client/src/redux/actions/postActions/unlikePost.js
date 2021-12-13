import { UNLIKE_POST_SUCCESS, UNLIKE_POST_FAILURE } from "../types";
import axios from "../../../axios";

export const unlikePost = (id) => {
    const options = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    };
    return dispatch => {
        axios.get(`/posts/${id}/unlikePost`, options)
            .then(res => {
                let successPost = res.data;
                dispatch(unlikePostsSuccess(successPost))
            })
            .catch(err => {
                let error = err.response;
                dispatch(unlikePostsFailure(error));
            });
    }
};

const unlikePostsSuccess = (id, successPost) => {
    return {
        type: UNLIKE_POST_SUCCESS,
        payload: {
            id,
            successPost
        }
    };
};

const unlikePostsFailure = error => {
    return {
        type: UNLIKE_POST_FAILURE,
        payload: {
            error
        }
    };
};