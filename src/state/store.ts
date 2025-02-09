import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice.ts";
import disclaimerReducer from "./disclaimer-slice.ts";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        disclaimer: disclaimerReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
