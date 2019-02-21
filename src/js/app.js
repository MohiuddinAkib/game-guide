import "materialize-css/dist/css/materialize.min.css";
import "../css/style.css";
import { Collapsible, Modal } from "materialize-css/dist/js/materialize.min.js";
import {
  signupUser,
  signOutUser,
  loginUser,
  authState,
  fetchGuides,
  createGuide
} from "./auth";

// DOM elems
import {
  signupForm,
  logout,
  loginForm,
  guideList,
  loggedOutLinks,
  loggedInLinks,
  createForm,
  accountDetails
} from "./DOMElems";
import { db } from "./firebaseConfig";

// Signup
signupForm.addEventListener("submit", e => {
  e.preventDefault();
  //   Get user info
  const email = signupForm["signup-email"].value,
    password = signupForm["signup-password"].value,
    bio = signupForm["signup-bio"].value;
  //   Sign up the user
  signupUser({ email, password, bio });
});

//   Sign out
logout.addEventListener("click", e => {
  e.preventDefault();
  // Sign out user
  signOutUser();
});

//   Login
loginForm.addEventListener("submit", e => {
  e.preventDefault();

  // User info
  const email = loginForm["login-email"].value,
    password = loginForm["login-password"].value;

  //   log user in
  loginUser({ email, password });
});

const setupUI = user => {
  if (user) {
    // Toggle UI elems
    loggedInLinks.forEach(item => (item.style.display = "block"));
    loggedOutLinks.forEach(item => (item.style.display = "none"));

    // Account info
    accountDetails.innerHTML = "<div>Loading..</div>";
    db.collection("users")
      .doc(user.uid)
      .get()
      .then(doc => {
        const html = `
        <div>Logged in as ${user.email}</div>
        <div>${doc.data().bio}</div>
      `;
        accountDetails.innerHTML = html;
      })
      .catch(err => console.error(err));
  } else {
    // Toggle UI elems
    loggedInLinks.forEach(item => (item.style.display = "none"));
    loggedOutLinks.forEach(item => (item.style.display = "block"));
    // Hide account info
    accountDetails.innerHTML = "";
  }
};

// Setup guides
const setupGuides = data => {
  if (data.length) {
    let html = "";
    data.forEach(doc => {
      const guide = doc.data();
      html += `<li>
        <div class="collapsible-header grey lighten-4">${guide.title}</div>
        <div class="collapsible-body white">${guide.content}</div>
      </li>`;
    });
    guideList.innerHTML = html;
  } else {
    guideList.innerHTML = "<h5 class='center-align'>Login to view guides</h5>";
  }
};

// Create guide
createForm.addEventListener("submit", e => {
  e.preventDefault();
  createGuide();
});

// setup materialize components
document.addEventListener("DOMContentLoaded", function() {
  var modals = document.querySelectorAll(".modal");
  Modal.init(modals);

  var items = document.querySelectorAll(".collapsible");
  Collapsible.init(items);

  authState(user => {
    if (user) {
      guideList.innerHTML = "<h5 class='center-align'>Loading...</h5>";
      setupUI(user);
      fetchGuides(setupGuides);
    } else {
      setupGuides([]);
      setupUI();
    }
  });
});
