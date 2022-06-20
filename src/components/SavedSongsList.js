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


  return (
    <Wrapper className="posts-list">
      <Title>Songs</Title>
      {firebaseSongs && firebaseSongs.map((song) =>(
        <Div key={song.id}>
          <h3>{song.data.title}</h3>
          <p className="post-content">{song.data.lyric.substring(0, 100)}</p>
          <SongAuthor userId={song.data.createdBy} />
        <Button onClick={() => handleDelete(song.id)}>Delete</Button>
        </Div> 
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

const Div = styled.div`
     display: flex;
     flex-direction: column;
     align-items: center;
     padding: 20px 20px;
`

const Wrapper = styled.section`
    background: papayawhip;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
`;

const Button = styled.button`
  background: #ea3546;
  text-transform: uppercase;
  cursor: pointer;
  color: white;
  border-radius: 4px;
  font-weight: 700;
  padding: 0.75rem 1.5rem;
  margin: 10px 0px ;
  &:hover {
    background: salmon;
    color:white;
  }
`

