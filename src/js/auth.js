import { auth } from "./firebaseConfig";
import { Modal } from "materialize-css/dist/js/materialize.min.js";

// DOM elems
const signupForm = document.querySelector("#signup-form"),
  logout = document.querySelector("#logout");

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

const signOutUser = () =>
  logout.addEventListener("click", e => {
    e.preventDefault();
    // Sign out user
    auth.signOut().then(() => console.log("User logged out"));
  });

export { signupUser, signOutUser };
