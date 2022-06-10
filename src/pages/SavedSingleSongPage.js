import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import {
  collection, query, orderBy, addDoc, serverTimestamp, onSnapshot, deleteDoc, doc,
} from 'firebase/firestore';
import {
  db, getSongs, handleDelete, onSaveSongClicked,
} from '../configs/firebaseConfig';
import { SongAuthor } from '../features/songs/SongAuthor';
import { TimeAgo } from '../features/songs/TimeAgo';

function SavedSingleSongPage() {
  const { id } = useParams();
  const [firebaseSongs, setFirebaseSongs] = useState('');

  // fetchData = async () => {
  //   const db = firebase.firestore();
  //   const data = await db.collection('songs').get();
  //   result = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  //   this.setState({ song: result });
  // };

  useEffect(() => {
    const q = query(collection(db, 'songs'), orderBy('date', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setFirebaseSongs(querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      })));
    });

    return unsubscribe;
  }, [setFirebaseSongs]);

  const songs = [...firebaseSongs];
  console.log(songs);

  const currentSong = songs.find((s) => s.id === id);
  // const currentSong = !song ? 'Song not found' : song;

  console.log(currentSong);

  if (!currentSong) {
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <section>
        <h2>Loading...</h2>
      </section>
    );
  }

  return (
    <Wrapper>
      <article className="song">
        <Title>{currentSong.data.title}</Title>
        <div>
          {/* <SongAuthor userId={currentSong.data.createdBy} /> */}
          <TimeAgo timestamp={currentSong.date} />
        </div>
        <p className="song-content">{currentSong.data.lyric}</p>
        <Div>
          <Link to={`/editSong/${currentSong.id}`}>
            <Button>
              Edit Song
            </Button>
          </Link>
          <Link to="/songs">
            <Button>
              Back
            </Button>
          </Link>
        </Div>
      </article>
    </Wrapper>
  );
}

export default SavedSingleSongPage;

const Wrapper = styled.section`
    background: papayawhip;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
`;

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
`;

const Button = styled.button`
  background: #ea3546;
  text-transform: uppercase;
  cursor: pointer;
  color: white;
  border-radius: 4px;
  font-weight: 700;
  padding: 0.75rem 1.5rem;
  margin-bottom: 5px;
  &:hover {
    background: salmon;
    color:white;
  }
`;
