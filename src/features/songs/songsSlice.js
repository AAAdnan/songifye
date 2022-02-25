import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = [
    { id: '1', title: 'First Song!', lyric: 'Hello!' },
    { id: '2', title: 'Second Song', lyric: 'More text' }
  ]

  const songsSlice = createSlice({
    name: 'songs',
    initialState,
    reducers: {
        songAdded: {
            reducer(state, action) {
              state.push(action.payload)
            },
            prepare(title, lyric, userId) {
              return {
                payload: {
                  id: nanoid(),
                  date: new Date().toISOString(),
                  title,
                  lyric,
                  user: userId
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
          }
    }
  })

  export const { songAdded, songUpdated } = songsSlice.actions

  export default songsSlice.reducer
