import { combineReducers, configureStore } from "@reduxjs/toolkit";

import chatReducer from "./slices/chat";
import userReducer from "./slices/users";

const rootReducer = combineReducers({
    users: userReducer,
    chat: chatReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});
