import { combineReducers } from "redux";
import authReducer from "./authReducer";
import postsReducer from "./postReducer";
import usersReducer from "./userReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    posts: postsReducer,
    users: usersReducer
});

export default rootReducer;