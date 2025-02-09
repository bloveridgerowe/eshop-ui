import { createSlice } from "@reduxjs/toolkit";

interface DisclaimerState {
    hasAcceptedDisclaimer: boolean;
}

const initialState: DisclaimerState = {
    hasAcceptedDisclaimer: JSON.parse(localStorage.getItem("hasAcceptedDisclaimer") || "false"),
};

const disclaimerSlice = createSlice({
    name: "disclaimer",
    initialState,
    reducers: {
        acceptDisclaimer: (state) => {
            state.hasAcceptedDisclaimer = true;
            localStorage.setItem("hasAcceptedDisclaimer", "true");
        },
    },
});

export const { acceptDisclaimer } = disclaimerSlice.actions;
export default disclaimerSlice.reducer;
