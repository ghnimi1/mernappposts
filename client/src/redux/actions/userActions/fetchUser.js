import {
    FETCH_USER_FAILURE,
    FETCH_USER_SUCCESS,
    FETCH_USER_STARTED
} from '../types'
import axios from '../../../axios'

export const fetchUser = (id) => {
    return dispatch => {
        const token = localStorage.getItem('token')
        dispatch(fetchUserStarted());
        axios.get(`/auth/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                let user = res.data;
                dispatch(fetchUserSuccess(user));
            })
            .catch(error => {
                dispatch(fetchUserFailure(error.response));
            });
    }
}

const fetchUserStarted = () => {
    return {
        type: FETCH_USER_STARTED
    }
}

const fetchUserSuccess = (user) => {
    return {
        type: FETCH_USER_SUCCESS,
        payload: {
            user
        }
    }
}

const fetchUserFailure = (error) => {
    return {
        type: FETCH_USER_FAILURE,
        payload: {
            error
        }
    }
}