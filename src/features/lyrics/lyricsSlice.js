import { createSlice, nanoid } from '@reduxjs/toolkit'


const initialState = [
    {
      artist: '',
    },
  ]

  const lyricsSlice = createSlice({
    name: 'lyrics',
    initialState,
    reducers: {
        artistAdded(state, action) {
            state.push(action.payload)
          },   
        songAdded: {
            reducer: (state,action) => {
                state.push(action.payload)
            },
            prepare: (artist, song) => {
                return { payload: { artist, song }}
            }
        }
    }
  })

  export const { artistAdded, songAdded } = lyricsSlice.actions

  export default lyricsSlice.reducer
