// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {

  loading : true,
  data : null,
  error : false,
  errorMessage : ""
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUser(state) {
        state.loading = true;
        state.error = false;
        state.errorMessage = "";
      },
      fetchUserSuccess(state, action) {
        state.loading = false;
        state.data = action.payload;
      },
      fetchUserFailue(state, action) {
        state.loading = false;
        state.error = true;
        state.errorMessage = action.payload;
      },
  },
});

export const { fetchUser , fetchUserFailue , fetchUserSuccess } = userSlice.actions;

export default userSlice.reducer;
