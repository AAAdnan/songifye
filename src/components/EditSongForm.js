import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom';

import { songUpdated } from '../features/songs/songsSlice'
import { useParams } from 'react-router-dom';


export const EditSongForm = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const song = useSelector(state => state.songs.find(song => song.id == id))

  const [title, setTitle] = useState(song.title)
  const [lyric, setLyric] = useState(song.lyric)

  const dispatch = useDispatch()

  const onTitleChanged = e => setTitle(e.target.value)
  const onLyricChanged = e => setLyric(e.target.value)

  const onSaveSongClicked = () => {
    if (title && lyric) {
      dispatch(songUpdated({ id: id, title, lyric }))
      navigate(`/songs/${id}`)
    }
  }

  return (
    <section>
      <h2>Edit Song</h2>
      <form>
        <label htmlFor="songTitle">Song Title:</label>
        <input
          type="text"
          id="songTitle"
          name="songTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="songLyric">Lyric:</label>
        <textarea
          id="songLyric"
          name="songLyric"
          value={lyric}
          onChange={onLyricChanged}
        />
      </form>
      <button type="button" onClick={onSaveSongClicked}>
        Save Song
      </button>
    </section>
  )
}