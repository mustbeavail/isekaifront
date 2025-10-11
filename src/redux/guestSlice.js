import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const saveGuest = createAsyncThunk(
    'guest/saveGuest',
    async (params, {rejectWithValue}) => {
        try{
            localStorage.setItem('guestId', params.guestId);
            const res = await axios.post(`${API_URL}/saveGuest`, params);
            return res;
        }catch(err){
            const message = err.response?.data?.message || err.message || '게스트아이디 저장 실패';
            return rejectWithValue(message);
        }
    }
);

const guestSlice = createSlice({
    name: "guest",
    initialState: {
        guestId: typeof window !== 'undefined' ? localStorage.getItem('guestId') : null,
        status : 'idle',
        error : null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(saveGuest.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(saveGuest.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.guestId = action.meta.arg.guestId;
            })
            .addCase(saveGuest.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
            })
    }
});

export default guestSlice.reducer;