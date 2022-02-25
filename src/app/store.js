import { configureStore } from '@reduxjs/toolkit';
import songsReducer from '../features/songs/songsSlice'
import usersReducer from '../features/users/usersSlice'


export const store = configureStore({
  reducer: {
    songs: songsReducer,
    users: usersReducer
  },
});
