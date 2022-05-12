import React from 'react'
import { Link } from 'react-router-dom'
import { getAuth, signOut } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const auth = getAuth();

export const Navbar = () => {

    let navigate = useNavigate();
    
    const user = useSelector((state) => state.auth.value);

    return (
    <nav>
        <section>
        {user && <Link to="/">
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
        Songs
        </Link>}
        {user && <Link to="/secret">
            Protected page
            </Link>}
        {user && <Link
            to="#"
            onClick={() => {
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
