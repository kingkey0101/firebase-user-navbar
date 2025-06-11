import React from "react";
import "./App.css";
import { auth, db } from "./firebase/init";
import { collection, addDoc, getDocs, getDoc, doc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import Nav from "./firebase/Nav";

//register user
function App() {
  //adding post to DataBase(adding document)
  function createPost() {
    const post = {
      title: "Land a $400k job",
      description: "Finish Frontend Simplified",
    };
    addDoc(collection(db, "posts"), post);
  }

  //Read all posts(shown on screen)
  async function getAllPosts() {
    const { docs } = await getDocs(collection(db, "posts"));

    //turns it to JavaScript
    const posts = docs.map((elem) => ({ ...elem.data(), id: elem.id }));
    console.log(posts);
  }

  //get post by id
  async function getPostById() {
    const hardcodedID = "JoL0rG4kudt1Ya266qZ5";

    const postRef = doc(db, "posts", hardcodedID);
    const postSnap = await getDoc(postRef);
    
    //only show if exists
    if (postSnap.exists()) {
      const post = postSnap.data();
      console.log(post);
    }
  }

  return (
    <div className="App">
      <Nav />
      <button onClick={createPost}>Create Post</button>
      <button onClick={getAllPosts}>Get All Posts</button>
      <button onClick={getPostById}>Get Posts By Id</button>
    </div>
  );
}

export default App;
