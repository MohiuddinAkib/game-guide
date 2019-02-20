import $ from "jquery";
window.$ = window.jQuery = $;
import "materialize-css/dist/css/materialize.min.css";
import "../css/style.css";
import "materialize-css/dist/js/materialize.min.js";
import { db, auth } from "./auth";

// setup materialize components
document.addEventListener("DOMContentLoaded", function() {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
});
