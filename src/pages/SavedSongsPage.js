/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Link } from 'react-router-dom';
import { SavedSongsList } from '../components/SavedSongsList';

function SavedSongsPage() {
  return (
    <section>
      <SavedSongsList />
    </section>
  );
}

export default SavedSongsPage;
