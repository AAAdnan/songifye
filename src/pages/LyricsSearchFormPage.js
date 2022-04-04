import React from 'react'
import { Link } from 'react-router-dom'
import { LyricsSearchForm } from '../components/LyricsSearchForm'
import { LyricsDisplay } from '../components/LyricsDisplay'
import styled from 'styled-components/macro'

import { useState, useEffect, useRef, useMemo } from "react";

const LyricsSearchFormPage = () => {

  const [ lyricsDisplay , setLyricsDisplay] = useState(false);

  const showLyricsDisplay = (state) => {
    setLyricsDisplay(state)
  }

  console.log(lyricsDisplay)


  return (
  <Wrapper>
    <Title>Songs page</Title>
    <div>
      { !lyricsDisplay  && <LyricsSearchForm showLyricsDisplay={showLyricsDisplay} /> }
      { lyricsDisplay && <LyricsDisplay /> }
    </div>
  </Wrapper>
  )
  }

export default LyricsSearchFormPage

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

const Title = styled.h1`
  font-size: 2.5em;
  text-align: center;
  color: palevioletred;
`;
