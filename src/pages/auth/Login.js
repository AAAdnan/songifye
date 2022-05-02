import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import styled from 'styled-components/macro'



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth();


 const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Singed in user: ", user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("An error occured: ", errorCode, errorMessage);
      });
  };

  return (
    <Wrapper>
      <Title>Login</Title>
      Email:
      <br />
      <Input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
      <div>
        <Button theme="pink" onClick={signIn}>Log In</Button>
      </div>
    </Wrapper>
  );
};

export default Login;

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

const Title = styled.h1`
  font-size: 3.5em;
  text-align: center;
  color: #F8B88B
  ;
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


