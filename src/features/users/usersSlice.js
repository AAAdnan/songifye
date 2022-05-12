import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
      saveUserDetails: (state, action) => {
          state.email = action.payload;
      }
  }
})

export const { saveUserDetails } = usersSlice.actions;


export default usersSlice.reducer