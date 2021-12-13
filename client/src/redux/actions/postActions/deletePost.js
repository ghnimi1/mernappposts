import { DELETE_POST_SUCCESS, DELETE_POST_FAILURE } from '../types'
import axios from '../../../axios'

export const removePost = (id) => dispatch => {

    axios.delete(`/posts/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }
    )
        .then(res => {
            let successMessage = res.data
            dispatch(deletePostSuccess(id, successMessage))
        })
        .catch(err => {
            let error = err.response;
            dispatch(deletePostFailure(error))
        });
}

const deletePostSuccess = (id, successPost) => {
    return {
        type: DELETE_POST_SUCCESS,
        payload: {
            id,
            successPost
        }
    }
}

const deletePostFailure = (error) => {
    return {
        type: DELETE_POST_FAILURE,
        payload: {
            error
        }
    }
}