import { configureStore } from "@reduxjs/toolkit";
import { simSlice } from "./simSlice";

export const store = () => {
    configureStore({
        reducer: {
            sim : simSlice
        }
    });
};