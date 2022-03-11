import { useState } from "react";
import { useGetLyricsByArtistQuery } from '../services/lyrics'

export const LyricsForm = () => {

    const [lyrics, setLyrics] = useState('');
    const [list, setList] = useState([]);


    
    const handleSubmit = (event) => {
        event.preventDefault();
        const { data, error, isLoading } = useGetLyricsByArtistQuery(lyrics)
        console.log(data)
        setLyrics()
    };

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <h3>Lyrics Search</h3>
          </div>
          <div>
            <input
              type="text"
              name="lyrics"
              placeholder="Enter artist or song name"
              onChange={event => setLyrics(event.target.value)} value={lyrics}
            />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>

      </div>
    );
  }
  