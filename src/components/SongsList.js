import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { TimeAgo } from '../features/songs/TimeAgo'
import { SongAuthor } from '../features/songs/SongAuthor'
import styled from 'styled-components/macro'
import {collection, query, orderBy, addDoc, serverTimestamp, onSnapshot, deleteDoc, doc} from 'firebase/firestore'
import {db, handleDelete, onSaveSongClicked} from '../configs/firebaseConfig'

export const SongsList = () => {

  const songs = useSelector(state => state.songs)


  const orderedSongs = songs
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))



  const renderedSongs = orderedSongs.map(song => (
    <Article key={song.id}>
      <h3>{song.title}</h3>
      <div>
        <SongAuthor userId={song.user} />
        <TimeAgo timestamp={song.date} />
      </div>
      <p>{song.lyric.substring(0, 100)}</p>
      <Div>
      <Link to={`/songs/${song.id}`}>
        <Button>
         View Song
        </Button>
      </Link>
        <Button onClick={() => onSaveSongClicked(song.user , song.title, song.lyric)} >
        Save Song
        </Button>
    </Div>
    </Article>
  ))

  console.log('these are the redux songs + ' + renderedSongs)

   

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

const Div = styled.div`
  padding: 10px;
`

const Article = styled.article`
  padding: 1.5rem 0;
  border-bottom: 1px solid #eee;
`

const Button = styled.button`
  display: inline-block;
  cursor: pointer;
  background: #ea3546;
  color: white;
  border-radius: 4px;
  font-weight: 700;
  padding: 0.75rem 1.5rem;
  margin-bottom: 5px;
  &:hover {
    background: salmon;
    color:white;
  }
`

const Wrapper = styled.section`
    background: papayawhip;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
`;

