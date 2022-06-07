import React from 'react'
import { useSelector } from 'react-redux'

export const SongAuthor = ({ userId }) => {
  const author = useSelector(state =>
    state.songs.find(song => song.user === userId)
  )

  console.log(author)

  return <span>by {author ? author.createdBy : 'Unknown author'}</span>
}