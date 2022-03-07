import { useState } from "react";
import { useGetLyricsByArtistQuery } from '../services/lyrics'

export const LyricsForm = () => {

    const [lyrics, setLyrics] = useState('');

    const { data, error, isLoading } = useGetLyricsByArtistQuery('Artic')


    const handleChange = (event) => {
        setLyrics(event.target.value);
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(lyrics);
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
              value={lyrics}
              onChange={handleChange}
            />
          </div>
          <div>
            <button>Submit</button>
          </div>
        </form>

      </div>
    );
  }
  