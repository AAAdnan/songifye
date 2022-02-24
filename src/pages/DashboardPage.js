import React from 'react'
import { Link } from 'react-router-dom'

const DashboardPage = () => (
  <section>
    <h1>Dashboard</h1>
    <p>This is the dashboard.</p>
    <div>
    <Link to="/songs" className="button">
        View Songs
    </Link>
    <Link to="/CreateSong" className="button">
        Create Song
    </Link>
    </div>
  </section>
)

export default DashboardPage