import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, Redirect } from 'react-router-dom'

import { initializeApp }  from 'firebase/app';
import { firebaseConfig } from '../src/configs/firebaseConfig'

import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { saveUser } from '../src/features/auth/authSlice'

import ProtectedRoute from './services/ProtectedRoute';

import DashboardPage from './pages/DashboardPage'
import SongsPage from './pages/SongsPage'
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



const App = () => {

  initializeApp(firebaseConfig);
  const auth = getAuth();
  const user = useSelector((state) => state.auth.value);
  console.log("user from state", user);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(saveUser(user.refreshToken));
      } else {
        dispatch(saveUser(undefined));
      }
    });
  }, [auth, dispatch]);

  return (
    <Router>
    <Navbar />
      <Routes>
        <Route exact path="/" element={<DashboardPage/>} />
        <Route exact path="login" element={<Login/>} />
        <Route exact path="Register" element={<Register/>} />
        <Route exact path="Reset" element={<Reset/>} />
        <Route exact path="Songs" element={<SongsPage/>} />
        <Route exact path="Songs/:id" element={<SingleSongPage />} />
        <Route exact path="WriteSong" element={<CreateSongPage />} />
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
  )
}

export default App