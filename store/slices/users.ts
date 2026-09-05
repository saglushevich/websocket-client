import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { type User } from "../../types/user";

type InitialState = {
    currentUserId: number | null;
    users: User[];
};

export const usersSlice = createSlice({
    name: "users",
    initialState: {
        currentUserId: null,
        users: [],
    } as InitialState,
    reducers: {
        setCurrentUserId(state, action: PayloadAction<number>) {
            state.currentUserId = action.payload;
        },
        setUsers(state, action: PayloadAction<User[]>) {
            state.users = action.payload;
        },
    },
    selectors: {
        currentUserIdSelector: (state) => state.currentUserId,
        usersSelector: (state) => state.users,
    },
});

export const { setCurrentUserId, setUsers } = usersSlice.actions;
export const { currentUserIdSelector, usersSelector } = usersSlice.selectors;
export default usersSlice.reducer;
