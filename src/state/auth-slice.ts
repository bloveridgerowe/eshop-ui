import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
    user: string | null;
    status: "loading" | "authenticated" | "unauthenticated";
}

const initialState: AuthState = {
    user: null,
    status: "loading",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<string>) => {
            state.user = action.payload;
            state.status = "authenticated";
        },
        logout: (state) => { // consumes logout() action and clears logged in user state away
            state.user = null;
            state.status = "unauthenticated";
        },
        setLoading: (state) => {
            state.status = "loading";
        }
    },
});

export const { loginSuccess, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
