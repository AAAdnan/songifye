import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { SongAuthor } from '../features/songs/SongAuthor'
import { ReactionButtons } from '../features/songs/ReactionButtons'
import { TimeAgo } from '../features/songs/TimeAgo'




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
      <article className="song">
        <h2>{song.title}</h2>
        <div>
          <SongAuthor userId={song.user} />
          <TimeAgo timestamp={song.date} />
        </div>
        <p className="song-content">{song.lyric}</p>
        <ReactionButtons song={song} />
        <Link to={`/editSong/${song.id}`} className="button">
          Edit Song
        </Link>
      </article>
    </section>
  )
}

export default SingleSongPage