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

const Nav = () => {
  const [user, setUser] = React.useState({});

  //loading state while fetching user
  const [loading, setLoading] = React.useState(true);

  //run empty array when page mounts []
  //signs user back in on page reload
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      //showing loading state
      setTimeout(() => {
        setUser(user || {});
        setLoading(false);
      }, 300);

      //print first letter of email
      console.log(user);

      if (user) {
        setUser(user);
      } else {
        setLoading(true);
      }
    });
  }, []);

  //register user
  function register() {
    setLoading(true);
    console.log("register");
    createUserWithEmailAndPassword(auth, "email@email.com", "password123")
      .then((user) => {
        setLoading(false);
        console.log(user);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }

  //login user
  function login() {
    setLoading(true);
    signInWithEmailAndPassword(auth, "email@email.com", "password123")
      .then(({ user }) => {
        setUser(user);
        setLoading(false);
        console.log(user);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.message);
      });
  }

  //logout user
  function logout() {
    setLoading(true);
    signOut(auth);
    setUser({});
    setLoading(false);
    console.log("signedout");
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
