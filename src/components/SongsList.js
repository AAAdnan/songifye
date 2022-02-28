import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { SongAuthor } from '../features/songs/SongAuthor'
import { TimeAgo } from '../features/songs/TimeAgo'
import { ReactionButtons } from '../features/songs/ReactionButtons'


export const SongsList = () => {

  const songs = useSelector(state => state.songs)

  const orderedSongs = songs
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))

  const renderedSongs = orderedSongs.map(song => (
    <article className="post-excerpt" key={song.id}>
      <h3>{song.title}</h3>
      <div>
        <SongAuthor userId={song.user} />
        <TimeAgo timestamp={song.date} />
      </div>
      <p className="post-content">{song.lyric.substring(0, 100)}</p>
      <ReactionButtons song={song} />
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