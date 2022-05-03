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

  return (
  <Wrapper>
      { !lyricsDisplay  && <LyricsSearchForm showLyricsDisplay={showLyricsDisplay} /> }
      { lyricsDisplay && <LyricsDisplay showLyricsDisplay={showLyricsDisplay }/> }
  </Wrapper>
  )
  }

export default LyricsSearchFormPage

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
  height: 100vh;
`;