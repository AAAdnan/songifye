import { useState, useEffect, useRef, useMemo } from "react";
import { useGetSongsByArtistQuery, useGetLyricsByArtistQuery } from '../services/lyrics'
import Table from "./Table";


export const LyricsSearchForm = ({ showLyricsDisplay }) => {

    const [artist, setArtist] = useState('');
    const [songList, setSongList] = useState([]);
    const [selectedArtist, setSelectedArtist] = useState('');
    const [selectedSongLyric, setSelectedSongLyrics] = useState('')
    const [skipSongSearch, setSkipSongSearch ] = useState(true)
    const [skipLyricSearch, setSkipLyricSearch ] = useState(true)

    const myRef = useRef();

    const { data, error, isLoading } = useGetSongsByArtistQuery(artist, { skip: skipSongSearch })

    if(data && data.data) {
        setSkipSongSearch(!skipSongSearch)
        setSongList(data.data)
    }


    const { data: lyricsData, error: lyricsError, isLoading: lyricsisLoading } = useGetLyricsByArtistQuery({artist: selectedArtist , songTitle: selectedSongLyric }, { skip: skipLyricSearch })

    console.log('this is the lyrics data' + lyricsData);

    const handleSubmit = () => {

        setSkipSongSearch(!skipSongSearch)

        if(myRef.current.value !== '') {
            setArtist(myRef.current.value)
        } else {
            alert("please input the search field");
        }

        console.log(artist)


    };

    const getSongLyrics = (artist, song) => {
        setSkipLyricSearch(!skipLyricSearch)
        setSelectedArtist(artist)
        setSelectedSongLyrics(song)
    }

  

    return (
      <div>
          <div>
            <h3>Lyrics Search</h3>
          </div>
          <div>
            <input
              type="text"
              name="lyrics"
              placeholder="Enter artist or song name"
              id="lyric"
              ref={myRef}
            />
          </div>
          <div>
            <button onClick={handleSubmit}>Submit</button>
          </div>
          <table>
            <tr>
                <th>Artist</th>
                <th>Song Title</th>
            </tr>
            {songList.length !==0 && songList.map(song => (
                <tr onClick={() => getSongLyrics(song.artist.name, song.title_short)}>
                    <td key={song.id}>{song.artist.name}</td> 
                    <td onClick={() => showLyricsDisplay(true)}
                    >{song.title_short}</td> 
                </tr>
            ))}
          </table>
          <div>{selectedSongLyric}</div>
      </div>
    );
  }
  
