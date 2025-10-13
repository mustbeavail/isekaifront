import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const guestSlice = createSlice({
    name: "guest",
    initialState: {
        guestId : typeof window !== 'undefined' ? localStorage.getItem('guestId') : null,
        isFirst : true
    },
    reducers: {
        getId(state, action){
            state.guestId = action.payload.newId;
        },
        isFirst(state){
            state.isFirst = false;
        }
    }
});

export default guestSlice.reducer;