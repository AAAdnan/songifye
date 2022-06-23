import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/macro'
import { selectUser } from '../features/users/usersSlice'
import { selectSongLyric } from '../features/lyrics/lyricsSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'


const DashboardPage = () => {

    const user = useSelector(selectUser)

    const lyrics = useSelector(selectSongLyric)

    let newArray = lyrics.filter((el) => {
        return el.artist.length > 0 
    })
    
    return (
        <Wrapper>
            <FontAwesomeIcon size="8x" color="#0E7C7B" icon={faCircleUser} />
            <Paragraph>Welcome {user && user.displayName}</Paragraph>
            <FontAwesomeIcon size="3x" icon={faMagnifyingGlass} />
            <Div>
            { newArray.length > 0 &&
                <Table>
                <TableContent>
                    <TableHeading>Artist</TableHeading>
                    <TableHeading>Song Title</TableHeading>
                </TableContent>
                {newArray.length !==0 && newArray.map(song => (
                    <TableContent >
                        <TableEntry key={song.id}>{song.artist}</TableEntry> 
                        <TableEntrySong>
                        {song.song}
                        </TableEntrySong> 
                    </TableContent>
                ))}
                </Table>
            }
            </Div>
            <Div>
                <Button theme="blue">
                    <Link to="/songs">
                        View Songs
                    </Link>
                </Button>
                <Button theme="blue">
                    <Link to="/WriteSong">
                        Write Song
                    </Link>
                </Button>
            </Div>
        </Wrapper>
    )
 
 }

export default DashboardPage;

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


const Wrapper = styled.section`
    background: papayawhip;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    padding: 40px;
`;

const Paragraph = styled.p`
 font-size: 36px;
 margin-top: 20px;
 color: #17BEBB;
`

const Div = styled.div`
    width: 50%;
    display: flex;
    justify-content: space-between;
    padding: 10px;
`


const Button = styled.button`
  background-color: ${(props) => theme[props.theme].default};
  padding: 1rem 1rem;
  font-weight: 700;
  cursor: pointer;
  border-radius: 5px;
  outline: 0;
  text-transform: uppercase;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  &:hover {
    background-color: ${(props) => theme[props.theme].hover};
  }
  &:disabled {
    opacity: 0.7;
  }
  margin: 20px 0px 20px 0px;
  align-self: center;
`;

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

