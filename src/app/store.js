/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { firebaseReducer } from 'react-redux-firebase';
import songsReducer from '../features/songs/songsSlice';
import lyricsReducer from '../features/lyrics/lyricsSlice';
import usersReducer from '../features/users/usersSlice';
import { pokemonApi } from '../services/pokemon';
import { lyricsApi } from '../services/lyrics';

export const store = configureStore({
  reducer: {
    songs: songsReducer,
    users: usersReducer,
    lyrics: lyricsReducer,
    firebase: firebaseReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [lyricsApi.reducerPath]: lyricsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(lyricsApi.middleware),
});

setupListeners(store.dispatch);
