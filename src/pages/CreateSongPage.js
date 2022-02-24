import React from 'react'
import { Link } from 'react-router-dom'
import { AddSongForm } from '../components/AddSongForm'

const CreateSongPage = () => (
  <section>
    <h1>Songs page</h1>
    <AddSongForm />
  </section>
)

export default CreateSongPage