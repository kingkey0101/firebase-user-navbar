import React from "react";
// import "./App.css";
import App from "../App";
import { auth } from "./init";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import logo from "../assets/kk logo2.png";

const Nav = ({ user, setUser, loading }) => {
  //register user
  function register() {
    console.log("register");
    createUserWithEmailAndPassword(auth, "email@email.com", "password123")
      .then((userCredential) => {
        setUser(userCredential.user);
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //login user
  function login() {
    signInWithEmailAndPassword(auth, "email@email.com", "password123")
      .then(({ user }) => {
        setUser(user);
        console.log(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  //logout user
  function logout() {
    signOut(auth)
    .then(() => {
      setUser({});
      console.log("signedout");
    });
  }

  return (
    <>
      <div className="nav__bar">
        <div className="nav__logo--wrapper">
          <img src={logo} alt="" className="nav__logo" />
        </div>
        <div className="nav__links">
          {loading ? (
            <div className="nav__skeleton">Loading...</div>
          ) : user && user.email ? (
            <div className="nav__link--logout">
              <button className="btn__logout" onClick={logout}>
                {loading ? "" : user.email[0].toUpperCase()}
              </button>
            </div>
          ) : (
            <>
              <div className="nav__link--login">
                <button onClick={login}>Login</button>
              </div>
              <div className="nav__link--register">
                <button onClick={register}>Register</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Nav;
