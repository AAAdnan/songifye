/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { AddSongForm } from '../components/AddSongForm';

function CreateSongPage() {
  return (
    <Wrapper>
      <AddSongForm />
    </Wrapper>
  );
}

export default CreateSongPage;

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
  min-height: 100vh;
`;
