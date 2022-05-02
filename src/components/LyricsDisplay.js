import { useState, useEffect, useRef, useMemo } from "react";
import { useGetLyricsByArtistQuery } from '../services/lyrics'
import Table from "./Table";
import { useSelector, useDispatch } from 'react-redux'



export const LyricsDisplay = ({ showLyricsDisplay }) => {

    const [skipLyricSearch, setSkipLyricSearch ] = useState(true)

    let artists = useSelector((state) => state.lyrics)

    let songLyric = artists[artists.length - 1 ]

    let currentArtist = songLyric.artist

    let currentSong = songLyric.song

    const { data, error , isLoading } = useGetLyricsByArtistQuery({ artist: currentArtist , songTitle: currentSong }, { skip: skipLyricSearch })



    const displayLyrics = () => {
        setSkipLyricSearch(!setSkipLyricSearch)
        console.log(data.lyrics)
    }


    return (
      <div >
        <div onClick={() => showLyricsDisplay(false)}>Click to go back</div>
        <div onClick={() => displayLyrics( currentArtist, currentSong )}>Click to display the song lyrics</div>
        { data && data.lyrics && <div> {data.lyrics}</div>
        
        }
      </div>
    );
  }
  
