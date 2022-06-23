import { useState, useEffect, useRef, useMemo } from "react";
import { useGetSongsByArtistQuery, useGetLyricsByArtistQuery } from '../services/lyrics'
import styled from 'styled-components/macro'
import { useSelector, useDispatch } from 'react-redux'
import { artistAdded } from '../features/lyrics/lyricsSlice'
import { songAdded } from '../features/lyrics/lyricsSlice'  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'


export const LyricsSearchForm = ({ showLyricsDisplay }) => {

    const [artist, setArtist] = useState('');
    const [songList, setSongList] = useState([]);
    const [skipSongSearch, setSkipSongSearch ] = useState(true)
    const [skipLyricSearch, setSkipLyricSearch ] = useState(true)

    const myRef = useRef();

    const dispatch = useDispatch();


    const { data, error, isLoading } = useGetSongsByArtistQuery(artist, { skip: skipSongSearch })

    console.log(data)

    if(data && data.data) {
        setSkipSongSearch(!skipSongSearch)
        setSongList(data.data)
    }

    const handleSubmit = () => {

        setSkipSongSearch(!skipSongSearch)

        if(myRef.current.value !== '') {
            setArtist(myRef.current.value)
        } else {
            alert("Please input the search field");
        }

        console.log(artist)


    };

    const getSongLyrics = (artist, song) => {
        setSkipLyricSearch(!skipLyricSearch)
        dispatch(songAdded(artist, song ))
    }

  

    return (
      <Wrapper>
          <Div>
           <FontAwesomeIcon size="2x" color="#0E7C7B" icon={faMagnifyingGlass} />
          </Div>
          <Input 
            type="text"
            name="lyrics"
            placeholder="Enter artist or song name"
            id="lyric"
            ref={myRef}
          >
          </Input>
          <div>
            <Button theme="blue" onClick={handleSubmit}>Submit</Button>
          </div>
          { songList.length !==0 &&
          <Table>
            <TableContent>
                <TableHeading>Artist</TableHeading>
                <TableHeading>Song Title</TableHeading>
            </TableContent>
            {songList.length !==0 && songList.map(song => (
                <TableContent onClick={() => getSongLyrics(song.artist.name, song.title_short)}>
                    <TableEntry key={song.id}>{song.artist.name}</TableEntry> 
                    <TableEntrySong onClick={() => showLyricsDisplay(true)}
                    >{song.title_short}
                    </TableEntrySong> 
                </TableContent>
            ))}
          </Table>
            }
      </Wrapper>
    );
  }

const theme = {
    blue: {
      default: "#17BEBB",
      hover: "#0E7C7B"
    },
    pink: {
      default: "palevioletred",
      hover: "#ad1457"
    }
  };

const Div = styled.h1`
  margin-bottom: 20px;
`;

const Wrapper = styled.section`
  text-align: center;
`;

const Input = styled.input`
  width: 50%;
  text-align: center;
  padding: 10px;
  margin: 10px 0;
  border:0; 
  border-bottom:1px solid #eee;
  box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
  border-radius:10px;
  font-family:inherit;
`;

const Button = styled.button`
  background-color: ${(props) => theme[props.theme].default};
  color: white;
  padding: 5px 15px;
  border-radius: 5px;
  outline: 0;
  text-transform: uppercase;
  margin: 10px 0px;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  &:hover {
    background-color: ${(props) => theme[props.theme].hover};
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;

Button.defaultProps = {
  theme: "pink"
};

const Table = styled.table`
    margin-top: 10px;
    margin-left:auto; 
    margin-right:auto;
    width: 100%;
`

const TableHeading = styled.th`
    color: palevioletred
`

const TableContent = styled.tr`
    color: salmon
`

const TableEntry = styled.td`
cursor: pointer;
`

const TableEntrySong = styled.td`
cursor: pointer;
&:hover {
  color: palevioletred;
}
`

  
