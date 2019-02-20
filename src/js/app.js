import "materialize-css/dist/css/materialize.min.css";
import "../css/style.css";
import { Collapsible, Modal } from "materialize-css/dist/js/materialize.min.js";
import { signupUser, signOutUser, login, authState, fetchGuides } from "./auth";

const guideList = document.querySelector(".guides");

// Setup guides
const setupGuides = data => {
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
};

// setup materialize components
document.addEventListener("DOMContentLoaded", function() {
  var modals = document.querySelectorAll(".modal");
  Modal.init(modals);

  var items = document.querySelectorAll(".collapsible");
  Collapsible.init(items);

  signupUser();
  signOutUser();
  login();
  authState();
  fetchGuides(setupGuides);
});
