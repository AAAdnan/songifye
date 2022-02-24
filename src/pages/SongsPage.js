import React from 'react'
import { Link } from 'react-router-dom'
import { SongsList } from '../components/SongsList'

const SongsPage = () => (
  <section>
    <h1>Songs page</h1>
    <SongsList />
  </section>
)

export default SongsPage