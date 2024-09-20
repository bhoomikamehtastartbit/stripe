import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authentication:false,
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action) {
      state.authentication = action.payload;
    },
   
  },
});

export const { setAuth } = AuthSlice.actions;

export default AuthSlice.reducer;