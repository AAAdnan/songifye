/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { AddSongFormTest } from '../components/AddSongFormTest';

function WriteSongPage() {
  return (
    <Wrapper>
      <AddSongFormTest />
    </Wrapper>
  );
}

export default WriteSongPage;

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
  min-height: 100vh;
`;
