import {
    FETCH_POSTS_FAILURE,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_STARTED,
    FETCH_POSTS_USER_STARTED,
    FETCH_POSTS_USER_SUCCESS,
    FETCH_POSTS_USER_FAILURE,
    ADD_POST_SUCCESS,
    ADD_POST_FAILURE,
    UPDATE_POST_SUCCESS,
    UPDATE_POST_FAILURE,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAILURE,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,
    LIKE_POST_FAILURE,
    LIKE_POST_SUCCESS,
    UNLIKE_POST_FAILURE,
    UNLIKE_POST_SUCCESS
}
    from '../actions/types'

const initaialState = {
    posts: [],
    loading: false,
    error: null,
    success: null
}
const postsReducer = (state = initaialState, action) => {
    switch (action.type) {
        case FETCH_POSTS_STARTED:
            return {
                ...state,
                loading: true
            };
        case FETCH_POSTS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                posts: action.payload.posts,
            };
        case FETCH_POSTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                success: null
            };
        case FETCH_POSTS_USER_STARTED:
            return {
                ...state,
                loading: true
            };
        case FETCH_POSTS_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                posts: action.payload.posts,
            };

        case FETCH_POSTS_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload?.error,
                success: null

            };

        case ADD_POST_SUCCESS:
            return {
                ...state,
                posts: [action.payload.post, ...state.posts],
                error: null,
                success: action.payload.successMessage
            };
        case ADD_POST_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                success: null
            };
        case DELETE_POST_SUCCESS:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload.id),
                error: null,
                success: action.payload.successMessage
            };
        case DELETE_POST_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                success: null
            };
        case UPDATE_POST_SUCCESS:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post._id === action.payload.id) {
                        return action.payload.newPost;
                    }
                    return post;
                }),
                error: null,
                success: action.payload.successMessage
            };
        case UPDATE_POST_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                success: null
            };
        case ADD_COMMENT_SUCCESS:
            return {
                ...state,
                posts: [action.payload.comment, ...state.comments],
                error: null,
                success: action.payload.successMessage
            };
        case ADD_COMMENT_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                success: null
            };
        case LIKE_POST_SUCCESS:
            return {
                ...state,
                error: null,
                success: action.payload.successMessage
            };
        case LIKE_POST_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                success: null
            };
        case UNLIKE_POST_SUCCESS:
            return {
                ...state,
                error: null,
                success: action.payload.successMessage
            };
        case UNLIKE_POST_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                success: null
            };
        default:
            return state;
    }
}
export default postsReducer