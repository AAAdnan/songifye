import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/macro'
import { songAdded} from '../features/songs/songsSlice'

export const AddSongForm = () => {
  const [title, setTitle] = useState('')
  const [lyric, setLyric] = useState('')
  const [userId, setUserId] = useState('')


  const dispatch = useDispatch()

  const users = useSelector(state => state.users)

  const user = users.email

  const onTitleChanged = e => setTitle(e.target.value)
  const onLyricChanged = e => setLyric(e.target.value)

  const onSaveSongClicked = () => {
    if (title && lyric) {
      dispatch(songAdded(title, lyric, userId))
      setTitle('')
      setLyric('')
    }
  }

  const canSave = Boolean(title) && Boolean(lyric) && Boolean(userId)

  return (
    <Wrapper>
      <Title>Add a New Song</Title>
      <Form>
            <SongTitleDiv>
                <label htmlFor="songTitle">Song Title:</label>
                    <input
                        type="text"
                        id="songTitle"
                        name="songTitle"
                        value={title}
                        onChange={onTitleChanged}
                />
            </SongTitleDiv>
            <AuthorDiv>
                <label htmlFor="songAuthor">Author:</label>
                <div>{users && user}</div>
            </AuthorDiv>
            <LyricDiv>
                <label htmlFor="songContent">Lyrics:</label>
                <textarea
                    id="songLyric"
                    name="songLyric"
                    value={lyric}
                    onChange={onLyricChanged}
                />
            </LyricDiv>
          <Button type="button" onClick={onSaveSongClicked} disabled={!canSave}>
            Save Song
          </Button>
      </Form>
    </Wrapper>
  )
}

const theme = {
    blue: {
      default: "#3f51b5",
      hover: "#283593"
    },
    pink: {
      default: "palevioletred",
      hover: "#ad1457"
    }
  };


const Wrapper = styled.section`
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

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    min-height: 1000px;
    width: 50%; 
`

const SongTitleDiv = styled.div`
    display: flex
    flex-direction: column;
`

const AuthorDiv = styled.div`
    display: flex
`

const LyricDiv = styled.div`
    display: flex
`

const Button = styled.button`
  background-color: ${(props) => theme[props.theme].default};
  margin: auto;
  width: 25%;
  color: white;
  padding: 5px 15px;
  border-radius: 5px;
  outline: 0;
  text-transform: uppercase;
  margin: 5px 0px;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  &:hover {
    background-color: ${(props) => theme[props.theme].hover};
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
  margin-top: 20px;
`;

Button.defaultProps = {
  theme: "pink"
};

