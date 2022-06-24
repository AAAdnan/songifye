import React from 'react'
import { PianoComponent } from '../components/PianoComponent'
import styled from 'styled-components/macro'

const PianoPage = () => {

  return (
    <Wrapper>
        <PianoComponent />
    </Wrapper>
  )
}

export default PianoPage;

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
  min-height: 100vh;
`;