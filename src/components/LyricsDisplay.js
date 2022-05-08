import { useState, useEffect, useRef, useMemo } from "react";
import { useGetLyricsByArtistQuery } from '../services/lyrics'
import Table from "./Table";
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components/macro'
import { formatRelativeWithOptions } from "date-fns/fp";


export const LyricsDisplay = ({ showLyricsDisplay }) => {

    const [skipLyricSearch, setSkipLyricSearch ] = useState(false)

    let artists = useSelector((state) => state.lyrics)

    let songLyric = artists[artists.length - 1 ]

    let currentArtist = songLyric.artist

    let currentSong = songLyric.song

    const { data, error , isLoading } = useGetLyricsByArtistQuery({ artist: currentArtist , songTitle: currentSong }, { skip: skipLyricSearch })



    // const displayLyrics = () => {
    //     setSkipLyricSearch(!setSkipLyricSearch)
    //     console.log(data)
    //     console.log(data.lyrics)
    // }

    // const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g,'<br>');


    return (
      <Wrapper>
        <DivTitle>
        { currentArtist && currentSong && 
                    <>
                    <TitleArtist> { currentArtist }</TitleArtist> 
                    <TitleSong> { currentSong }</TitleSong> 
                    </>
        }
            <Button theme="pink" onClick={() => showLyricsDisplay(false)}>Back</Button>
        </DivTitle>
        { data && data.lyrics && 
            <Div> {data.lyrics}</Div>
        }
      </Wrapper>
    );
  }
  

const theme = {
    blue: {
      default: "#3f51b5",
      hover: "#283593"
    },
    pink: {
      default: "palevioletred",
      hover: "#ad1457"
    }
  };


const Wrapper = styled.section`
    text-align: center;
    height: 100%;
`;


const Div = styled.div`
  white-space: pre-wrap;
  color: salmon;
  margin-top: 20px;
`

const DivTitle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 30%;
    justify-content: space-between
    `


const Button = styled.button`
  background-color: ${(props) => theme[props.theme].default};
  color: white;
  padding: 5px 15px;
  border-radius: 5px;
  outline: 0;
  text-transform: uppercase;
  margin: 5px 0px;
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
  margin-top: 20px;
`;

Button.defaultProps = {
  theme: "pink"
};

const TitleArtist = styled.div`
  font-size: 3.5em;
  font-weight: bold;
  text-align: center;
  color: #F8B88B
  ;
`;

const TitleSong = styled.div`
  font-size: 2.5em;
  font-weight: bold;
  text-align: center;
  color: salmon
  ;
`;

