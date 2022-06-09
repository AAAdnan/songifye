/* eslint-disable react/jsx-filename-extension */
import React, {
  useState, useEffect, useRef, useMemo,
} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { LyricsSearchForm } from '../components/LyricsSearchForm';
import { LyricsDisplay } from '../components/LyricsDisplay';

function LyricsSearchFormPage() {
  const [lyricsDisplay, setLyricsDisplay] = useState(false);

  const showLyricsDisplay = (state) => {
    setLyricsDisplay(state);
  };

  return (
    <Wrapper>
      { !lyricsDisplay && <LyricsSearchForm showLyricsDisplay={showLyricsDisplay} /> }
      { lyricsDisplay && <LyricsDisplay showLyricsDisplay={showLyricsDisplay} /> }
    </Wrapper>
  );
}

export default LyricsSearchFormPage;

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
  min-height: 100vh;
`;
