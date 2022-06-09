/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Link } from 'react-router-dom';
import { SongsList } from '../components/SongsList';

function SongsPage() {
  return (
    <section>
      <SongsList />
    </section>
  );
}

export default SongsPage;
