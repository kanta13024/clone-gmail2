import React from "react";
import "../assets/css/Login.css";
import Logo from "../assets/logo/logo.png";
import { useDispatch } from "react-redux";
import { auth, provider } from "../firebase";
import { Button } from "@material-ui/core";
import { login } from "../features/userSlice";

function Login() {
  const dispatch = useDispatch();

  const signIn = () => {
    auth.signInWithPopup(provider).then(({ user }) => {
      dispatch(
        login({
          displayName: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
        })
      );
    });
  };

  return (
    <div className="login">
      <div className="login__container">
        <img src={Logo} alt="適当なロゴ" />
      </div>
      <Button variant="contained" color="primary" onClick={signIn}>
        Login!!
      </Button>
    </div>
  );
}

export default Login;
