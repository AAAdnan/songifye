import React, { useState, useEffect } from 'react'
import { createSlice, nanoid } from '@reduxjs/toolkit'
import {collection, query, orderBy, addDoc, serverTimestamp, onSnapshot, deleteDoc, doc} from 'firebase/firestore'
import {db, getSongs, handleDelete, onSaveSongClicked} from '../../configs/firebaseConfig'
import { sub } from 'date-fns'


const FirebaseState = () => {

  let [songs, setSongs] = useState('')

  useEffect(() => {
    const q = query(collection(db, 'songs'), orderBy('date', 'desc'))
    onSnapshot(q, (querySnapshot) => {
      setSongs(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  },[])
  
}

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
