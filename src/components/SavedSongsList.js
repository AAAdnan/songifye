/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/prefer-default-export */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import {
  collection, query, orderBy, addDoc, serverTimestamp, onSnapshot, deleteDoc, doc,
} from 'firebase/firestore';
import { TimeAgo } from '../features/songs/TimeAgo';
import { SongAuthor } from '../features/songs/SongAuthor';
import { db, handleDelete } from '../configs/firebaseConfig';
import { songPicked } from '../features/songs/songsSlice';

export function SavedSongsList() {
  const [firebaseSongs, setFirebaseSongs] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'songs'), orderBy('date', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setFirebaseSongs(querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      })));
    });

    return unsubscribe;
  }, []);

  console.log(firebaseSongs);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const openSongClicked = (id) => {
    dispatch(songPicked());
    navigate(`/savedsongs/${id}`);
  };

  return (
    <Wrapper className="posts-list">
      <Title>Songs</Title>
      {firebaseSongs && firebaseSongs.map((song) => (
        <div key={song.id}>
          <h3>{song.data.title}</h3>
          <p className="post-content">{song.data.lyric.substring(0, 100)}</p>
          <div>{song.data.lyric}</div>
          {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
          <p>Saved by {song.data.createdBy}</p>
          {/* <SongAuthor userId={song.data.user} /> */}
          <div className="button muted-button">Edit</div>
          <div className="button muted-button" onClick={() => handleDelete(song.id)}>Delete</div>
          <Button type="button" onClick={() => openSongClicked(song.id)} className="">
            View Song
          </Button>
        </div>
      ))}
    </Wrapper>
  );
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

const Button = styled.button`
  background-color: #ea3546;
  cursor: pointer;
  width: 25%;
  color: white;
  padding: 5px 15px;
  border-radius: 5px;
  outline: 0;
  text-transform: uppercase;
  transition: ease background-color 250ms;
  &:hover {
    background-color: #ad1457;
  }
  &:disabled {
    opacity: 0.7;
  }
  margin: 20px 0px 20px 0px;
  align-self: center;
`;
