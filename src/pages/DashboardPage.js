import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/macro'


const DashboardPage = () => {

    const users = useSelector(state => state.users)

    const user = users.email
    
    return (
        <Wrapper>
            <Title>Profile</Title>
            <p>Welcome {user}</p>
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

const Title = styled.h2`
    font-size: 3.5em;
    font-weight: bold;
    text-align: center;
    color: #F8B88B
`;

const Div = styled.div`
    display: inline-block;
    padding: 20px;
`


const Button = styled.button`
  background: papayawhip;
  padding: 2rem 0;
  font-weight: 700;
  cursor: pointer;
  color: black;
  border-radius: 5px;
  outline: 0;
  text-transform: uppercase;
  margin: 5px 0px;
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



