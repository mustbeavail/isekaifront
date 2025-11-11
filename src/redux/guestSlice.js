import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const guestSlice = createSlice({
    name: "guest",
    initialState: {
        guestId : null,
        isFirst : true
    },
    reducers: {
        setId(state, action){
            state.guestId = action.payload.storedId;
        },
        isFirst(state){
            state.isFirst = false;
        }
    }
});

export default guestSlice.reducer;