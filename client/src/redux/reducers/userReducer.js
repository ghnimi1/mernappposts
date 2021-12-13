import {
    FETCH_USERS_FAILURE,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_STARTED,
    FETCH_CURRENT_USER_STARTED,
    FETCH_CURRENT_USER_SUCCESS,
    FETCH_CURRENT_USER_FAILURE,
    FETCH_USER_STARTED,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE
}
    from '../actions/types'

const initaialState = {
    currentUser: null,
    user: null,
    users: [],
    loading: false,
    error: null,
    success: null
}
const usersReducer = (state = initaialState, action) => {
    switch (action.type) {
        case FETCH_USERS_STARTED:
            return {
                ...state,
                loading: true
            };
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                users: action.payload.users,
            };
        case FETCH_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                success: null
            };
        case FETCH_CURRENT_USER_STARTED:
            return {
                ...state,
                loading: true
            };
        case FETCH_CURRENT_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                currentUser: action.payload.currentUser,
            };
        case FETCH_CURRENT_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                success: null
            };
        case FETCH_USER_STARTED:
            return {
                ...state,
                loading: true
            };
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                user: action.payload.user,
            };
        case FETCH_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                success: null
            };
        default:
            return state;
    }
}
export default usersReducer