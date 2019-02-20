import "materialize-css/dist/css/materialize.min.css";
import "../css/style.css";
import { Collapsible, Modal } from "materialize-css/dist/js/materialize.min.js";
import { signupUser, signOutUser } from "./auth";

// setup materialize components
document.addEventListener("DOMContentLoaded", function() {
  var modals = document.querySelectorAll(".modal");
  Modal.init(modals);

  var items = document.querySelectorAll(".collapsible");
  Collapsible.init(items);

  signupUser();
  signOutUser();
});
