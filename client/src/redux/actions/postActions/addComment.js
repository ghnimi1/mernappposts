import { ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE } from "../types";
import axios from "../../../axios";

export const addComment = (id, comment) => {
    const options = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    };
    return dispatch => {
        axios.post(`/posts/${id}/commentPost`, comment, options)
            .then(res => {
                let successMessage = res.data;
                dispatch(addCommentSuccess(comment, successMessage));
            })
            .catch(err => {
                let error = err.response;
                dispatch(addCommentFailure(error));
            });
    }
};

const addCommentSuccess = (comment, successMessage) => {
    return {
        type: ADD_COMMENT_SUCCESS,
        payload: {
            comment,
            successMessage
        }
    };
};

const addCommentFailure = error => {
    return {
        type: ADD_COMMENT_FAILURE,
        payload: {
            error
        }
    };
};