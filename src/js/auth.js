import { auth, db } from "./firebaseConfig";
import { Modal } from "materialize-css/dist/js/materialize.min.js";

// DOM elems
const signupForm = document.querySelector("#signup-form"),
  logout = document.querySelector("#logout"),
  loginForm = document.querySelector("#login-form");

// Signup
const signupUser = () =>
  signupForm.addEventListener("submit", e => {
    e.preventDefault();

    //   Get user info
    const email = signupForm["signup-email"].value,
      password = signupForm["signup-password"].value;

    //   Sign up the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
      const modal = document.querySelector("#modal-signup");
      //   close modal
      Modal.getInstance(modal).close();
      //   reset form
      signupForm.reset();
    });
  });

//   Sign out
const signOutUser = () =>
  logout.addEventListener("click", e => {
    e.preventDefault();
    // Sign out user
    auth.signOut();
  });

//   Login
const loginUser = () =>
  loginForm.addEventListener("submit", e => {
    e.preventDefault();

    // User info
    const email = loginForm["login-email"].value,
      password = loginForm["login-password"].value;

    //   log user in
    auth
      .signInWithEmailAndPassword(email, password)
      .then(data => {
        const modal = document.querySelector("#modal-login");
        Modal.getInstance(modal).close();
        loginForm.reset();
      })
      .catch(err => console.error(err));
  });

const authState = cb => auth.onAuthStateChanged(user => cb(user));

const fetchGuides = cb =>
  db
    .collection("guides")
    .get()
    .then(snapshot => cb(snapshot.docs))
    .catch(err => console.log(err));

export { signupUser, signOutUser, loginUser, authState, fetchGuides };
