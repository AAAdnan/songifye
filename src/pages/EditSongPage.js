import React from 'react'
import { Link } from 'react-router-dom'
import { EditSongForm } from '../components/EditSongForm'

const EditSongPage = () => (
  <section>
    <h1>Songs page</h1>
    <EditSongForm />
  </section>
)

export default EditSongPage