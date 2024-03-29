import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import { auth, onAuthStateChanged} from '../src/configs/firebaseConfig'
import { login, logout, selectUser } from '../src/features/users/usersSlice'
import { useSelector, useDispatch } from "react-redux";

import ProtectedRoute from './services/ProtectedRoute';

import DashboardPage from './pages/DashboardPage'
import SongsPage from './pages/SongsPage'
import SavedSongsPage from './pages/SavedSongsPage'
import SingleSongPage from './pages/SingleSongPage'
import CreateSongPage from './pages/CreateSongPage'
import EditSongPage  from './pages/EditSongPage'
import LyricsSearchFormPage from './pages/LyricsSearchFormPage'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Reset from './pages/auth/Reset'
import Pokemon from './pages/Pokemon'
import { Navbar } from './components/Navbar'
import Secret from './pages/protected/Secret'
import EditSongPageTest  from './pages/EditSongPageTest'

import styled from 'styled-components/macro'


const App = () => {

  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        // user is logged in, send the user's details to redux, store the current user in the state
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoUrl: userAuth.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);


  return (
    <Wrapper>
    <Router>
    <Navbar />
      <Routes>
        <Route exact path="/" element={<LyricsSearchFormPage/>} />
        <Route exact path="Profile" element={<DashboardPage/>} />
        <Route exact path="login" element={<Login/>} />
        <Route exact path="Register" element={<Register/>} />
        <Route exact path="Reset" element={<Reset/>} />
        <Route exact path="Songs" element={<SongsPage/>} />
        <Route exact path="SavedSongs" element={<SavedSongsPage/>} />
        <Route exact path="Songs/:id" element={<SingleSongPage />} />
        <Route exact path="WriteSong" element={<CreateSongPage />} />
        <Route exact path="EditSongPageTest" element={<EditSongPageTest />} />
        <Route exact path="editSong/:id" element={<EditSongPage />} />
        <Route exact path="LyricSearch" element={<LyricsSearchFormPage />} />
        <Route exact path ="Pokemon" element={<Pokemon />} />
        <Route
        path="/secret"
        element={
          <ProtectedRoute user={user}>
            <Secret />
          </ProtectedRoute>
        }
      />
        <Route
            path="*"
            element={<Navigate to="/" />}
        />
      </Routes>
    </Router>
    </Wrapper>
  )
}

export default App

const Wrapper = styled.div`
  background: #4B1D3F;
`