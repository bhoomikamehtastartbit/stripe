import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  amount:'',
  type:'',
  PriceId:'',
  status:''
};

const addDataSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    setData(state, action) {
      state.name = action.payload.name;
      state.amount=action.payload.amount;
      state.type=action.payload.type;
      state.PriceId=action.payload.PriceId;
    },
   
  },
});

export const { setData } = addDataSlice.actions;

export default addDataSlice.reducer;