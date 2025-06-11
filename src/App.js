import React from "react";
import "./App.css";
import { auth } from "./firebase/init";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import Nav from "./firebase/Nav";

//register user
function App() {

  return (
    <div className="App">
      <Nav />
    </div>
  );
}

export default App;
