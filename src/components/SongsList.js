import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


export const SongsList = () => {

  const songs = useSelector(state => state.songs)

  const renderedSongs = songs.map(song => (
    <article className="post-excerpt" key={song.id}>
      <h3>{song.title}</h3>
      <p className="post-content">{song.lyric.substring(0, 100)}</p>
      <Link to={`/songs/${song.id}`} className="button muted-button">
        View Song
      </Link>
    </article>
  ))

  return (
    <section className="posts-list">
      <h2>Songs</h2>
      {renderedSongs}
    </section>
  )
}