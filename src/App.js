import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import DashboardPage from './pages/DashboardPage'
import SongsPage from './pages/SongsPage'
import SingleSongPage from './pages/SingleSongPage'
import CreateSongPage from './pages/CreateSongPage'
import EditSongPage  from './pages/EditSongPage'
import LyricsSearchFormPage from './pages/LyricsSearchFormPage'
import Pokemon from './pages/Pokemon'
import { Navbar } from './components/Navbar'



const App = () => {
  return (
    <Router>
    <Navbar />
      <Routes>
        <Route exact path="/" element={<DashboardPage/>} />
        <Route exact path="/Songs" element={<SongsPage/>} />
        <Route exact path="/Songs/:id" element={<SingleSongPage />} />
        <Route exact path="/CreateSong" element={<CreateSongPage />} />
        <Route exact path="/editSong/:id" element={<EditSongPage />} />
        <Route exact path="/LyricsSearch" element={<LyricsSearchFormPage />} />
        <Route exact path ="/Pokemon" element={<Pokemon />} />
        <Route
            path="*"
            element={<Navigate to="/" />}
        />
      </Routes>
    </Router>
  )
}

export default App