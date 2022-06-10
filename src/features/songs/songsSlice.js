import React, { useState, useEffect } from 'react';
import { createSlice, nanoid } from '@reduxjs/toolkit';
import {
  collection, query, orderBy, addDoc, serverTimestamp, onSnapshot, deleteDoc, doc,
} from 'firebase/firestore';
import { sub } from 'date-fns';
import {
  db, getSongs, handleDelete, onSaveSongClicked,
} from '../../configs/firebaseConfig';

const FirebaseState = () => {
  const [songs, setSongs] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'songs'), orderBy('date', 'desc'));
    onSnapshot(q, (querySnapshot) => {
      setSongs(querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      })));
    });
  }, []);
};

const initialState = [
];

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    songAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, lyric, user) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            lyric,
            // ***message*** this line decides what goes into the createdBy prop:
            createdBy: user.uid,
          },
        };
      },
    },
    songUpdated(state, action) {
      const { id, title, lyric } = action.payload;
      const existingSong = state.find((song) => song.id === id);
      if (existingSong) {
        existingSong.title = title;
        existingSong.lyric = lyric;
      }
    },
    // ***message*** this was an attempt, doesn't work for now,
    // ***message*** 2: it did actually load the song into the store
    // but on redux songs list page, need to figure out how to use it
    songPicked(state, action) {
      const id = action.payload;
      const existingSong = state.find((song) => song.id === id);
      return {
        singleSong: existingSong,
      };
    },
  },
});

export const {
  songAdded, songPicked, songUpdated, reactionAdded,
} = songsSlice.actions;

export default songsSlice.reducer;
