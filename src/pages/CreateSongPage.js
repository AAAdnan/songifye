import React from 'react'
import { Link } from 'react-router-dom'
import { AddSongForm } from '../components/AddSongForm'
import styled from 'styled-components/macro'


const CreateSongPage = () => (
  <Wrapper>
    <AddSongForm />
  </Wrapper>
)

export default CreateSongPage

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
  min-height: 100vh;
`;