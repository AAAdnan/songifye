import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = [
  ]

  const songsSlice = createSlice({
    name: 'songs',
    initialState,
    reducers: {
        songAdded: {
            reducer(state, action) {
              state.push(action.payload)
            },
            prepare(title, lyric, user) {
              return {
                payload: {
                  id: nanoid(),
                  date: new Date().toISOString(),
                  title,
                  lyric,
                  createdBy: user.displayName
                }
              }
            }
          },
          songUpdated(state, action) {
            const { id, title, lyric } = action.payload
            const existingSong = state.find(song => song.id === id)
            if (existingSong) {
              existingSong.title = title
              existingSong.lyric = lyric
            }
          },
    }
  })

  export const { songAdded, songUpdated, reactionAdded } = songsSlice.actions

  export default songsSlice.reducer
