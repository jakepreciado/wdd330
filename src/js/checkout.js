import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const myCheckout = new CheckoutProcess("so-cart", ".checkout-summary");
myCheckout.init();

// Update the order summary when the zip code is entered
document.querySelector("#zip").addEventListener("blur", () => {
  myCheckout.calculateOrderTotal();
});

// Handle form submission
document.forms["checkout"].addEventListener("submit", (e) => {
  e.preventDefault();
  myCheckout.checkout();
});