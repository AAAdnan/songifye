import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'



const SingleSongPage = () => {
  const { id } = useParams();

  const song = useSelector(state =>
    state.songs.find(song => song.id === id)
  )

  if (!song) {
    return (
      <section>
        <h2>Song not found!</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h2>{song.title}</h2>
        <p className="post-content">{song.lyric}</p>
        <Link to={`/editSong/${song.id}`} className="button">
          Edit Song
        </Link>
      </article>
    </section>
  )
}

export default SingleSongPage