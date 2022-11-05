import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    email: null,
    username: null,
    userID: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        activeUser: (state, action) => {
            state.isLoggedIn = true;
            state.email = action.payload.email;
            state.username = action.payload.username;
            state.userID = action.payload.userID;
        },
        removeUser: (state) => {
            state.isLoggedIn = false;
            state.email = null;
            state.username = null;
            state.userID = null;
        },
    },
});

export const { activeUser, removeUser } = authSlice.actions;

export default authSlice.reducer;
