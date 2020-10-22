import "../../sass/index.scss";
import store from "../store/index.js";
import List from "../components/list.js";

// Load up some DOM elements
const formElement = document.querySelector("[data-js=form]");
const inputElement = document.querySelector("#new-item");

// Add a submit event listener to the form and prevent it from posting back
formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();

    // Grab the text value of the textbox and trim any whitespace off it
    let value = inputElement.value.trim();

    // If there's some content, trigger the action and clear the field, ready for the next item
    if (value.length) {
        store.dispatch("addItem", value);
        inputElement.value = "";
        inputElement.focus();
    }
});

// Instantiate components
const listInstance = new List();

// Initial renders
listInstance.render();
