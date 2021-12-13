import { UPDATE_POST_SUCCESS, UPDATE_POST_FAILURE } from '../types'
import axios from '../../../axios'

export const updatePost = (id, post) => dispatch => {

    axios.patch(`/posts/${id}`, post, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }
    )
        .then(res => {
            let updatedPost = res.data
            let successMessage = res.data
            dispatch(updatedPostSuccess(id, updatedPost, successMessage))
        })
        .catch(err => {
            let error = err.response;
            dispatch(updatedPostFailure(error))
        });
}

const updatedPostSuccess = (id, newPost, successPost) => {
    return {
        type: UPDATE_POST_SUCCESS,
        payload: {
            id,
            newPost,
            successPost
        }
    }
}

const updatedPostFailure = (error) => {
    return {
        type: UPDATE_POST_FAILURE,
        payload: {
            error
        }
    }
}