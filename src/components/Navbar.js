import React from 'react'
import { Link } from 'react-router-dom'
import { getAuth, signOut } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";

const auth = getAuth();



export const Navbar = () => {

    const user = useSelector((state) => state.auth.value);

    return (
    <nav>
        <section>
        <Link to="/">Dashboard</Link>
        {!user && <Link to="/login">
        Login    
        </Link> }
        {!user && <Link to="/register">
        Register    
        </Link> } 
        <Link to="/lyricsearch">
        Find Lyrics
        </Link>
        <Link to="/songs">
            Songs
        </Link>
        {user && <Link to="/secret">
            Protected page
            </Link>}
        {user && <Link
            to="#"
            onClick={() => {
                signOut(auth)
                .then(() => {
                    console.log("user signed out");
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
