import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE
}
    from '../actions/types'

const initaialState = {
    token: null,
    loading: false,
    error: null,
}
const authReducer = (state = initaialState, action) => {
    switch (action.type) {
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                error: null,
                token: action.payload.token
            };
        case LOGIN_USER_FAILURE:
            return {
                ...state,
                error: action.payload.error,
            };
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                error: null,
                token: action.payload.token
            }
        case REGISTER_USER_FAILURE:
            return {
                ...state,
                error: action.payload.error
            }
        default:
            return state;
    }
}
export default authReducer