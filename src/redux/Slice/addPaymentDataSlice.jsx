import { createSlice } from '@reduxjs/toolkit';

const initialState = {
data:[]
};

const DataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
   
  },
});

export const { setData } = DataSlice.actions;

export default DataSlice.reducer;