import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components/macro'
import { songUpdated } from '../features/songs/songsSlice'
import { useParams, Link } from 'react-router-dom';


export const EditSongFormTest = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const song = useSelector(state => state.songs.find(song => song.id == id))

  const [title, setTitle] = useState(song.title)
  const [lyric, setLyric] = useState(song.lyric)

  const dispatch = useDispatch()

  const onTitleChanged = e => setTitle(e.target.value)
  const onLyricChanged = e => setLyric(e.target.value)

  const onSaveSongClicked = () => {
    if (title && lyric) {
      dispatch(songUpdated({ id: id, title, lyric }))
      navigate(`/songs/${id}`)
    }
  }

  return (
    <Wrapper>
      <Title>Edit Song</Title>
      <Form>
        <SongTitleDiv>
            <Label htmlFor="songTitle">Song Title:</Label>
            <Input
                type="text"
                id="songTitle"
                name="songTitle"
                placeholder="What's on your mind?"
                value={title}
                onChange={onTitleChanged}
            />
        </SongTitleDiv>
        <LyricDiv>
            <Label htmlFor="songLyric">Lyric:</Label>
            <TextArea
                id="songLyric"
                name="songLyric"
                value={lyric}
                onChange={onLyricChanged}
            />
        </LyricDiv>
        <Button type="button" onClick={onSaveSongClicked}>
             Save Song
        </Button>
        <Button type="button" onClick={onSaveSongClicked}>
            <Link to={'/songs'}>
                Back  
            </Link> 
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


const Form = styled.form`
    display: flex;
    text: arial;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start:    
    min-height: 1000px;
    width: 75%;
    border-style: solid; 
    border-color: #F8B88B;
`

const SongTitleDiv = styled.div`
    display: flex;
    margin-top: 20px;
`

const LyricDiv = styled.div`
    display: flex
`

const Label = styled.label`
    padding: 10px;
`

const Input = styled.input`
    width: 75%;
`

const TextArea = styled.textarea`
    width: 75%;
    min-height: 1000px;
`

const Button = styled.button`
  background-color: ${(props) => theme[props.theme].default};
  cursor: pointer;
  width: 25%;
  color: white;
  padding: 5px 15px;
  border-radius: 5px;
  outline: 0;
  text-transform: uppercase;
  margin: 5px 0px;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  &:hover {
    background-color: ${(props) => theme[props.theme].hover};
  }
  &:disabled {
    opacity: 0.7;
  }
  margin: 20px 0px 20px 0px;
  align-self: center;
`;

Button.defaultProps = {
  theme: "pink"
};


