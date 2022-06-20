import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, createUserWithEmailAndPassword,  updateProfile } from '../../configs/firebaseConfig';
import styled from 'styled-components/macro'
import { useDispatch } from "react-redux";
import { login } from '../../features/users/usersSlice'
import Modal from "../../components/Modal/modal"




const Register = () => {

  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState('');
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState('');
  const [active, setActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")


  const dispatch = useDispatch();

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        updateProfile(userAuth.user, {
          displayName: name,
          photoURL: profilePic,
        })
        .then(
          // Dispatch the user information for persistence in the redux state
          dispatch(
            login({
              email: userAuth.user.email,
              uid: userAuth.user.uid,
              displayName: name,
              photoUrl: profilePic,
            })
          )
        )
        setEmail("");
        setPassword("");
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error ocurred: ", errorCode, errorMessage);
        setActive(true);
        setErrorMessage(error.message)

      });
  };

  const canSave = Boolean(name) && Boolean(email) && Boolean(password)

  return (
    <Wrapper>
      <Title>Register</Title>
      Name
      <br />
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='Full name (required for registering)'
        type='text'
      />
      <br />
      Email:
      <br />
      <Input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      Profile Picture
      <br />
      <Input
        value={profilePic}
        onChange={(e) => setProfilePic(e.target.value)}
        placeholder='Profile picture URL (optional)'
      type='text'
      />
      <br />
      Password:
      <br />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <Button theme="pink" onClick={handleRegister} disabled={!canSave}>Register</Button>
      <Modal
        active={active}
        hideModal={() => setActive(false)}
        icon="fa-solid fa-exclamation"
      >
      {errorMessage}
    </Modal>
    </Wrapper>
  );
};

export default Register;

const theme = {
    blue: {
      default: "#3f51b5",
      hover: "#283593"
    },
    pink: {
      default: "palevioletred",
      hover: "#ad1457"
    }
  };


const Wrapper = styled.section`
  text-align: center;
  background: papayawhip;
  height: 100vh;
  padding: 4em;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  border:0; 
  border-bottom:1px solid #eee;
  box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
  border-radius:10px;
  font-family:inherit;
`;

const Title = styled.h1`
  font-size: 3.5em;
  text-align: center;
  color: #F8B88B
  ;
`;

const Button = styled.button`
  background-color: ${(props) => theme[props.theme].default};
  color: white;
  padding: 5px 15px;
  border-radius: 5px;
  outline: 0;
  text-transform: uppercase;
  margin: 10px 0px;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  &:hover {
    background-color: ${(props) => theme[props.theme].hover};
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;


