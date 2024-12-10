import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    token: null,
    profilePicture: '',
  },
  reducers: {
    login: (state, action) => {
      state.username = action.payload.username;
      state.profilePicture = action.payload.profilePicture || '';
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.username = '';
      state.token = '';
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
