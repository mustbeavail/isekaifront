import { configureStore } from "@reduxjs/toolkit";
import simSlice from "./simSlice";
import guestSlice from "./guestSlice";

export const store = configureStore({
    reducer: {
        sim : simSlice,
        guest : guestSlice
    }
});