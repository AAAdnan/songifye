import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = [
  {
    artist: '',
  },
];

const lyricsSlice = createSlice({
  name: 'lyrics',
  initialState,
  reducers: {
    artistAdded(state, action) {
      state.push(action.payload);
    },
    songAdded: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: (artist, song) => ({ payload: { artist, song } }),
    },
  },
});

export const { artistAdded, songAdded } = lyricsSlice.actions;

export const selectSongLyric = (state) => state.lyrics;

export default lyricsSlice.reducer;
