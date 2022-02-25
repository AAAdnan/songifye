import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { songAdded} from '../features/songs/songsSlice'

export const AddSongForm = () => {
  const [title, setTitle] = useState('')
  const [lyric, setLyric] = useState('')
  const [userId, setUserId] = useState('')


  const dispatch = useDispatch()

  const users = useSelector(state => state.users)

  console.log(users)


  const onTitleChanged = e => setTitle(e.target.value)
  const onLyricChanged = e => setLyric(e.target.value)
  const onAuthorChanged = e => setUserId(e.target.value)

  const onSaveSongClicked = () => {
    if (title && lyric) {
      dispatch(songAdded(title, lyric, userId))
      setTitle('')
      setLyric('')
    }
  }

  const canSave = Boolean(title) && Boolean(lyric) && Boolean(userId)

  const usersOptions = users.map(user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

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
            <label htmlFor="songAuthor">Author:</label>
            <select id="songAuthor" value={userId} onChange={onAuthorChanged}>
              <option value=""></option>
              {usersOptions}
            </select>
            <label htmlFor="songContent">Lyrics</label>
            <textarea
                id="songLyric"
                name="songLyric"
                value={lyric}
                onChange={onLyricChanged}
            />
          <button type="button" onClick={onSaveSongClicked} disabled={!canSave}>
            Save Song
          </button>
      </form>
    </section>
  )
}