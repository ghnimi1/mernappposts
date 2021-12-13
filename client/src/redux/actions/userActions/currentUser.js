import {
    FETCH_CURRENT_USER_STARTED,
    FETCH_CURRENT_USER_SUCCESS,
    FETCH_CURRENT_USER_FAILURE
} from '../types'
import axios from '../../../axios'

export const fetchCurrentUser = () => {
    return dispatch => {
        dispatch(fetchCurrentUserStarted());
        const token = localStorage.getItem('token')
        axios.get('/auth/current', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                let currentUser = res.data;
                dispatch(fetchCurrentUserSuccess(currentUser));
            })
            .catch(error => {
                dispatch(fetchCurrentUserFailure(error.response));
            });
    }
}

const fetchCurrentUserStarted = () => {
    return {
        type: FETCH_CURRENT_USER_STARTED
    }
}

const fetchCurrentUserSuccess = (currentUser) => {
    return {
        type: FETCH_CURRENT_USER_SUCCESS,
        payload: {
            currentUser
        }
    }
}

const fetchCurrentUserFailure = (error) => {
    return {
        type: FETCH_CURRENT_USER_FAILURE,
        payload: {
            error
        }
    }
}