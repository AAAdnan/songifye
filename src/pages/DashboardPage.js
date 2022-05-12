import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const DashboardPage = () => {

    const users = useSelector(state => state.users)

    const user = users.email
    
    return (
        <section>
        <h1>Profile</h1>
        <p>Welcome {user}</p>
        <div>
        <Link to="/songs" className="button">
            View Songs
        </Link>
        <Link to="/WriteSong" className="button">
            Write Song
        </Link>
        </div>
    </section>
    )
 
 }

export default DashboardPage