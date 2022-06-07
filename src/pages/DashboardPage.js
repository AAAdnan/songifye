import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/macro'
import { selectUser } from '../features/users/usersSlice'
import { selectSongLyric } from '../features/lyrics/lyricsSlice'


const DashboardPage = () => {

    const user = useSelector(selectUser)

    const lyrics = useSelector(selectSongLyric)

    let newArray = lyrics.filter((el) => {
        return el.artist.length > 0 
    })
    
    return (
        <Wrapper>
            <Title>Profile</Title>
            <Paragraph>Welcome {user && user.displayName}</Paragraph>
            <SubHeader>Search History</SubHeader>
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
            <Div>
                <Button>
                    <Link to="/songs">
                        View Songs
                    </Link>
                </Button>
                <Button>
                    <Link to="/WriteSong">
                        Write Song
                    </Link>
                </Button>
            </Div>
        </Wrapper>
    )
 
 }

export default DashboardPage;

const Wrapper = styled.section`
    background: papayawhip;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
`;

const Paragraph = styled.p`
 color: palevioletred;
`

const Title = styled.h2`
    font-size: 3.5em;
    font-weight: bold;
    text-align: center;
    color: #F8B88B
`;

const SubHeader = styled.h3`
    font-size: 2.5em;
    font-weight: bold;
    text-align: center;
    color: #F8B88B
`;

const Div = styled.div`
    width: 50%;
    display: flex;
    justify-content: space-between;
    padding: 10px;
`


const Button = styled.button`
  background: #F8B88B;
  padding: 1rem 1rem;
  font-weight: 700;
  cursor: pointer;
  border-radius: 5px;
  outline: 0;
  text-transform: uppercase;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  &:disabled {
    opacity: 0.7;
  }
  &:hover {
    background: salmon;
    color:white;
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

