import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { TimeAgo } from '../features/songs/TimeAgo'
import { SongAuthor } from '../features/songs/SongAuthor'
import styled from 'styled-components/macro'
import {collection, query, orderBy, addDoc, serverTimestamp, onSnapshot, deleteDoc, doc} from 'firebase/firestore'
import {db, handleDelete} from '../configs/firebaseConfig'

export const SavedSongsList = () => {

  const [firebaseSongs, setFirebaseSongs] = useState('')

  useEffect(() => {
    const q = query(collection(db, 'songs'), orderBy('date', 'desc'))

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setFirebaseSongs(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })

    return unsubscribe;
    
  }, [])


  console.log(firebaseSongs)


  return (
    <Wrapper className="posts-list">
      <Title>Songs</Title>
      {firebaseSongs && firebaseSongs.map((song) =>(
        <div key={song.id}>
          <h3>{song.data.title}</h3>
          <p className="post-content">{song.data.lyric.substring(0, 100)}</p>
          <div>{song.data.lyric}</div>
          <SongAuthor userId={song.data.user} />
          <div className="button muted-button">Edit</div>
          <div className="button muted-button" onClick={() => handleDelete(song.id)}>Delete</div>
          <Link to={`/songs/${song.id}`} className="button muted-button">
            View Song
          </Link>
        </div>
    ))}
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
