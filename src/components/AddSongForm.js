import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'

import { songAdded} from '../features/songs/songsSlice'

export const AddSongForm = () => {
  const [title, setTitle] = useState('')
  const [lyric, setLyric] = useState('')

  const dispatch = useDispatch()

  const onTitleChanged = e => setTitle(e.target.value)
  const onLyricChanged = e => setLyric(e.target.value)

  const onSaveSongClicked = () => {
    if (title && lyric) {
      dispatch(
        songAdded({
          id: nanoid(),
          title,
          lyric
        })
      )

      setTitle('')
      setLyric('')
    }
  }

  return (
    <section>
      <h2>Add a New Song</h2>
      <form>
      <label htmlFor="songTitle">Song Title:</label>
            <input
                type="text"
                id="songTitle"
                name="songTitle"
                value={title}
                onChange={onTitleChanged}
            />
            <label htmlFor="postContent">Lyrics</label>
            <textarea
                id="postLyric"
                name="postLyric"
                value={lyric}
                onChange={onLyricChanged}
            />
        <button type="button" onClick={onSaveSongClicked}>
          Save Post
        </button>
      </form>
    </section>
  )
}