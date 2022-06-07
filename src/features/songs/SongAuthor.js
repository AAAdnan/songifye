import React from 'react'
import { useSelector } from 'react-redux'

export const SongAuthor = ({ userId }) => {

  return <span>by {userId ? userId : 'Unknown author'}</span>
}