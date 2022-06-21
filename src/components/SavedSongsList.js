import React, { useEffect, useState } from 'react'
import { SongAuthor } from '../features/songs/SongAuthor'
import styled from 'styled-components/macro'
import {collection, query, orderBy, addDoc, serverTimestamp, onSnapshot, deleteDoc, doc} from 'firebase/firestore'
import {db, handleDelete} from '../configs/firebaseConfig'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'


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
      <FontAwesomeIcon size="4x" color="#0E7C7B" icon={faFloppyDisk} />
      {firebaseSongs && firebaseSongs.map((song) =>(
        <Div key={song.id}>
          <h3>{song.data.title}</h3>
          <p className="post-content">{song.data.lyric.substring(0, 100)}</p>
          <SongAuthor userId={song.data.createdBy} />
        <Button theme="blue" onClick={() => handleDelete(song.id)}>Delete</Button>
        </Div> 
    ))}
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
     display: flex;
     flex-direction: column;
     align-items: center;
     padding: 20px 20px;
`

const Wrapper = styled.section`
    background: papayawhip;
    padding: 50px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
`;

const Button = styled.button`
  background-color: ${(props) => theme[props.theme].default};
  text-transform: uppercase;
  cursor: pointer;
  color: white;
  border-radius: 4px;
  font-weight: 700;
  padding: 0.75rem 1.5rem;
  margin: 10px 0px ;
  &:hover {
    background-color: ${(props) => theme[props.theme].hover};
  }
`

