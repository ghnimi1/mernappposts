import {
    FETCH_USERS_FAILURE,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_STARTED
} from '../types'
import axios from '../../../axios'

export const fetchUsers = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        dispatch(fetchUsersStarted());
        axios.get('/auth/', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                let users = res.data;
                dispatch(fetchUsersSuccess(users));
            })
            .catch(error => {
                dispatch(fetchUsersFailure(error.response));
            });
    }
}

const fetchUsersStarted = () => {
    return {
        type: FETCH_USERS_STARTED
    }
}

const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: {
            users
        }
    }
}

const fetchUsersFailure = (error) => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: {
            error
        }
    }
}