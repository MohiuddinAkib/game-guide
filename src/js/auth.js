import { auth, db } from "./firebaseConfig";
import { Modal } from "materialize-css/dist/js/materialize.min.js";

// DOM elems
import { signupForm, loginForm, createForm } from "./DOMElems";

const closeModal = id => {
  const modal = document.querySelector(id);
  //   close modal
  Modal.getInstance(modal).close();
};

// Signup
const signupUser = payload =>
  //   Sign up the user
  auth
    .createUserWithEmailAndPassword(payload.email, payload.password)
    .then(cred => {
      //   close modal
      closeModal("#modal-signup");
      //   reset form
      signupForm.reset();
    });

//   Sign out
const signOutUser = () =>
  // Sign out user
  auth.signOut();

//   Login
const loginUser = payload =>
  //   log user in
  auth
    .signInWithEmailAndPassword(payload.email, payload.password)
    .then(data => {
      // close modal
      closeModal("#modal-login");
      loginForm.reset();
    })
    .catch(err => console.error(err));

// Checks auth state
const authState = cb => auth.onAuthStateChanged(user => cb(user));

// Fetch all guides
const fetchGuides = cb =>
  db
    .collection("guides")
    .get()
    .then(snapshot => cb(snapshot.docs))
    .catch(err => console.log(err));

// Create guide
const createGuide = () =>
  db
    .collection("guides")
    .add({
      title: createForm["title"].value,
      content: createForm["content"].value
    })
    .then(() => {
      closeModal("#modal-create");
      createForm.reset();
    })
    .catch(err => console.log(err));

export {
  signupUser,
  signOutUser,
  loginUser,
  authState,
  fetchGuides,
  createGuide
};
