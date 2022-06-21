import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { TimeAgo } from '../features/songs/TimeAgo'
import { SongAuthor } from '../features/songs/SongAuthor'
import styled from 'styled-components/macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/free-solid-svg-icons'
import { onSaveSongClicked} from '../configs/firebaseConfig'

export const SongsList = () => {

  const songs = useSelector(state => state.songs)


  const orderedSongs = songs
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))


  const renderedSongs = orderedSongs.map(song => (
    <Article key={song.id}>
      <h3>{song.title}</h3>
      <div>
        <SongAuthor userId={song.createdBy} />
        <TimeAgo timestamp={song.date} />
      </div>
      <p>{song.lyric.substring(0, 100)}</p>
      <Div>
      <Link to={`/songs/${song.id}`}>
        <Button theme="blue">
         View Song
        </Button>
      </Link>
        <Button theme="blue" onClick={() => onSaveSongClicked(song.createdBy , song.title, song.lyric)} >
        Save Song
        </Button>
    </Div>
    </Article>
  ))

  console.log('these are the redux songs + ' + renderedSongs)

   

  return (
    <Wrapper className="posts-list">
      <FontAwesomeIcon size="4x" color="#0E7C7B" icon={faMusic} />
      {renderedSongs}
    </Wrapper>
  )
}

const theme = {
  blue: {
    default: "#17BEBB",
    hover: "#0E7C7B"
  },
  pink: {
    default: "palevioletred",
    hover: "#ad1457"
  }
};


const Div = styled.div`
  padding: 10px;
`

const Article = styled.article`
  padding: 1.5rem 0;
  border-bottom: 1px solid #eee;
`

const Button = styled.button`
  font-size: 1.1rem;
  cursor: pointer;
  background-color: ${(props) => theme[props.theme].default};
  &:hover {
    background-color: ${(props) => theme[props.theme].hover};
  }
  color: white;
  border-radius: 4px;
  font-weight: 700;
  padding: 0.75rem 1.5rem;
  margin-bottom: 5px;
`

const Wrapper = styled.section`
    background: papayawhip;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    padding: 50px;
`;

