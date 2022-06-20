import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { SongAuthor } from '../features/songs/SongAuthor'
import { TimeAgo } from '../features/songs/TimeAgo'
import styled from 'styled-components/macro'


const SingleSongPage = () => {
  const { id } = useParams();

  const song = useSelector(state =>
    state.songs.find(song => song.id === id)
  )

  if (!song) {
    return (
      <section>
        <h2>Song not found!</h2>
      </section>
    )
  }

  return (
    <Wrapper>
      <article className="song">
        <Title>{song.title}</Title>
        <div>
          <SongAuthor userId={song.createdBy} />
          <TimeAgo timestamp={song.date} />
        </div>
        <p className="song-content">{song.lyric}</p>
        <Div>
          <Link to={`/editSong/${song.id}`} >
          <Button>
              Edit Song
          </Button>
          </Link>
          <Link to={`/songs`}>
            <Button>
                Back
            </Button>
          </Link>
        </Div>
      </article>
    </Wrapper>
  )
}

export default SingleSongPage

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
`

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
`
