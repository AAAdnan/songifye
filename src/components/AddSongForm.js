import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/macro'
import { songAdded} from '../features/songs/songsSlice'
import { selectUser } from '../features/users/usersSlice'
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'


export const AddSongForm = () => {
  const [title, setTitle] = useState('')
  const [lyric, setLyric] = useState('')

  const dispatch = useDispatch()
  let navigate = useNavigate();

  const user = useSelector(selectUser)

  const onTitleChanged = e => setTitle(e.target.value)
  const onLyricChanged = e => setLyric(e.target.value)

  const onSaveReduxSongClicked = () => {
    if (title && lyric && user) {
      dispatch(songAdded(title, lyric, user))
      navigate('/songs')
      setTitle('')
      setLyric('')
    }
    else {
      console.log('error')
    }
    
  }

  const canSave = Boolean(title) && Boolean(lyric) && Boolean(user)

  return (
    <Wrapper>
      <Icon>
       <FontAwesomeIcon  size="6x" color="#0E7C7B" icon={faPen} />
      </Icon>
      <Form>
            <SongTitleDiv>
                <Label htmlFor="songTitle">Song Title:</Label>
                    <Input
                        type="text"
                        id="songTitle"
                        name="songTitle"
                        value={title}
                        onChange={onTitleChanged}
                    />
            </SongTitleDiv>
            <AuthorDiv>
                <Label htmlFor="songAuthor">Author:</Label>
                <Div>{user.displayName}</Div>
            </AuthorDiv>
            <LyricDiv>
                <Label htmlFor="songContent">Lyrics:</Label>
                <TextArea
                    id="songLyric"
                    name="songLyric"
                    value={lyric}
                    onChange={onLyricChanged}
                />
            </LyricDiv>
          <Button type="button" theme="blue" onClick={onSaveReduxSongClicked} disabled={!canSave}>
            Save Song
          </Button>
      </Form>
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


const Wrapper = styled.section`
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
`;

const Form = styled.div`
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

const Div = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`

const Icon = styled.section`
  margin-bottom: 40px;
`;


const SongTitleDiv = styled.div`
    display: flex;
    margin: 20px 10px 20px 10px;
`

const Label = styled.label`
    padding: 10px;
`

const Input = styled.input`
    width: 75%;
`

const TextArea = styled.textarea`
    width: 75%;
    text: arial;
    min-height: 1000px;
`

const AuthorDiv = styled.div`
    display: flex;
    margin: 20px 10px 20px 10px;
    align-content: baseline;
`

const LyricDiv = styled.div`
    display: flex;
    margin: 20px 10px 20px 10px;

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

