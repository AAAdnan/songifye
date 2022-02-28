import React from 'react'

import { useDispatch } from 'react-redux'

import { reactionAdded } from './songsSlice'

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀'
}

export const ReactionButtons = ({ song }) => {

const dispatch = useDispatch()


  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button key={name} 
              type="button" 
              className="muted-button reaction-button"
              onClick={() =>
                dispatch(reactionAdded({ songId: song.id, reaction: name }))
              }>
        {emoji} {song.reactions[name]}
      </button>
    )
  })

  return <div>{reactionButtons}</div>
}