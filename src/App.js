import React from "react";
import "./App.css";
import { auth, db } from "./firebase/init";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import Nav from "./firebase/Nav";

//register user
function App() {
  const [user, setUser] = React.useState({});
  //loading state while fetching user info
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setTimeout(() => {
        setUser(firebaseUser || {});
        setLoading(false);
      }, 300);
      //print first letter of email
      console.log(firebaseUser);

      // if (user) {
      //   setUser(user);
      // } else {
      //   setLoading(true);
      // }
    });
    return unsubscribe;
  }, []);

  //adding post to DataBase(adding document)
  function createPost() {
    const post = {
      title: "Finish Firebase",
      description: "Do Frontend Simplified",
      uid: user.uid,
    };

    addDoc(collection(db, "posts"), post);
  }

  //updating post
  async function updatePost() {
    const hardcodedID = "JoL0rG4kudt1Ya266qZ5";
    const postRef = doc(db, "posts", hardcodedID);
    const post = await getPostById(hardcodedID);
    console.log(post);
    const newPost = {
      //only changing title of post
      //using all data just feched by (post) using spread operator
      ...post,
      title: "land $700k job",
    };
    console.log(newPost);
    updateDoc(postRef, newPost);
  }

  function deletePost() {
       const hardcodedID = "JoL0rG4kudt1Ya266qZ5";
    const postRef = doc(db, "posts", hardcodedID);
    deleteDoc(postRef)
  }

  //Read all posts(shown on screen)
  async function getAllPosts() {
    const { docs } = await getDocs(collection(db, "posts"));

    //turns it to JavaScript
    const posts = docs.map((elem) => ({ ...elem.data(), id: elem.id }));
    console.log(posts);
  }

  //get post by id
  async function getPostById(id) {
    const hardcodedID = "JoL0rG4kudt1Ya266qZ5";
    const postRef = doc(db, "posts", id);
    const postSnap = await getDoc(postRef);

    //only show if exists
    if (postSnap.exists()) {
      return postSnap.data();
    }
  }

  //read posts by query(will only work if logged in)
  async function getPostByUid() {
    const postCollectionRef = await query(
      collection(db, "posts"),
      where("uid", "==", user.uid)
    );
    const { docs } = await getDocs(postCollectionRef);
    //gives query post info in JavaScript
    console.log(docs.map((doc) => doc.data()));
  }

  return (
    <div className="App">
      <Nav user={user} setUser={setUser} loading={loading} />
      <button onClick={createPost}>Create Post</button>
      <button onClick={getAllPosts}>Get All Posts</button>
      <button onClick={getPostById}>Get Posts By Id</button>
      <button onClick={getPostByUid}>Get Posts By Uid</button>
      <button onClick={updatePost}>Update Post</button>
      <button onClick={deletePost}>Delete Post</button>
    </div>
  );
}

export default App;
