import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { TimeAgo } from '../features/songs/TimeAgo'
import { SongAuthor } from '../features/songs/SongAuthor'
import styled from 'styled-components/macro'

export const SongsList = () => {

  const songs = useSelector(state => state.songs)

  const orderedSongs = songs
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))

  const renderedSongs = orderedSongs.map(song => (
    <article className="post-excerpt" key={song.id}>
      <h3>{song.title}</h3>
      <div>
        <SongAuthor userId={song.user} />
        <TimeAgo timestamp={song.date} />
      </div>
      <p className="post-content">{song.lyric.substring(0, 100)}</p>
      <Link to={`/songs/${song.id}`} className="button muted-button">
        View Song
      </Link>
    </article>
  ))

  return (
    <Wrapper className="posts-list">
      <Title>Songs</Title>
      {renderedSongs}
    </Wrapper>
  )
}

const Title = styled.h2`
    font-size: 3.5em;
    font-weight: bold;
    text-align: center;
    color: #F8B88B
`;

const Wrapper = styled.section`
    background: papayawhip;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
`;

