import React from 'react'
import { Link } from 'react-router-dom'
import { AddSongFormTest } from '../components/AddSongFormTest'
import styled from 'styled-components/macro'


const WriteSongPage = () => (
  <Wrapper>
    <AddSongFormTest />
  </Wrapper>
)

export default WriteSongPage

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
  min-height: 100vh;
`;