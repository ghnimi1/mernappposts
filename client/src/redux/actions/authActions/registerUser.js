import { REGISTER_USER_FAILURE, REGISTER_USER_SUCCESS } from '../types'
import axios from '../../../axios'

export const registerUser = (user) => {
    return dispatch => {
        axios.post('/auth/register', user)
            .then(res => {
                let token = localStorage.setItem('token', res.data.token);
                dispatch(registerUserSuccess(user, token))
                window.location.replace('/accueil')
                console.log(res);
            })
            .catch(err => {
                let error = err.response;
                dispatch(registerUserFailure(error))
            });
    }
}
const registerUserSuccess = (user, token) => {
    return {
        type: REGISTER_USER_SUCCESS,
        payload: {
            user, token
        }
    }
}
const registerUserFailure = error => {
    return {
        type: REGISTER_USER_FAILURE,
        payload: {
            error
        }
    }
}