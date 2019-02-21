import "materialize-css/dist/css/materialize.min.css";
import "../css/style.css";
import { Collapsible, Modal } from "materialize-css/dist/js/materialize.min.js";
import {
  signupUser,
  signOutUser,
  loginUser,
  authState,
  fetchGuides
} from "./auth";

const guideList = document.querySelector(".guides"),
  loggedOutLinks = document.querySelectorAll(".logged-out"),
  loggedInLinks = document.querySelectorAll(".logged-in");

const setupUI = user => {
  if (user) {
    // Toggle UI elems
    loggedInLinks.forEach(item => (item.style.display = "block"));
    loggedOutLinks.forEach(item => (item.style.display = "none"));
  } else {
    // Toggle UI elems
    loggedInLinks.forEach(item => (item.style.display = "none"));
    loggedOutLinks.forEach(item => (item.style.display = "block"));
  }
};

// Setup guides
const setupGuides = data => {
  if (data.length) {
    let html = "";
    data.forEach(doc => {
      const guide = doc.data();
      console.log(guide);
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

// setup materialize components
document.addEventListener("DOMContentLoaded", function() {
  var modals = document.querySelectorAll(".modal");
  Modal.init(modals);

  var items = document.querySelectorAll(".collapsible");
  Collapsible.init(items);

  signupUser();
  signOutUser();
  loginUser();
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
