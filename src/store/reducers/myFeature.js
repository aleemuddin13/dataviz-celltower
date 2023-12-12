// src/features/myFeatureSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const myFeatureSlice = createSlice({
    name: 'myFeature',
    initialState: {
        value: 0,
    },
    reducers: {
        increment: state => {
            state.value += 1;
        },
        decrement: state => {
            state.value -= 1;
        },
    },
});

export const { increment, decrement } = myFeatureSlice.actions;
export default myFeatureSlice.reducer;
