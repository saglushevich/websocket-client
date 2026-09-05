import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/users";
import chatReducer from "./slices/chat";

const rootReducer = combineReducers({
    users: userReducer,
    chat: chatReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});
