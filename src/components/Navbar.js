import React from 'react'
import { Link } from 'react-router-dom'
import { auth, signOut } from '../configs/firebaseConfig'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from '../features/users/usersSlice'
import { logout } from '../features/users/usersSlice'

export const Navbar = () => {

    let navigate = useNavigate();
    
    const user = useSelector(selectUser);

    const dispatch = useDispatch();


    return (
    <nav>
        <section>
        {user && <Link to="/Profile">
        Profile
        </Link>}
        {!user && <Link to="/login">
        Login    
        </Link> }
        {!user && <Link to="/register">
        Register    
        </Link> } 
        <Link to="/lyricsearch">
        Find Lyrics
        </Link>
        {user && <Link to="/WriteSong">
        Write Songs
        </Link>}
        {user && <Link to="/songs">
        Current Songs
        </Link>}
        {user && <Link to="/SavedSongs">
        Saved Songs
        </Link>}
        {user && <Link
            to="#"
            onClick={() => {
                dispatch(logout());
                signOut(auth)
                .then(() => {
                    navigate("/login")
                })
                .catch((error) => {
                    console.log("error", error);
                });
            }}
            >
            Log out
        </Link>}
        </section>
    </nav>
    )
}
