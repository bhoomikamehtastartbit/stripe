import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  propertyData: [],
};

const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    setPropertyData(state, action) {
      state.propertyData = action.payload;
    },
   
  },
});

export const { setPropertyData } = propertySlice.actions;

export default propertySlice.reducer;