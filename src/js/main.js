import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("register-modal");
    const closeModal = document.getElementById("close-modal");
    const registerBtn = document.getElementById("register-btn");
  
    // Check if the user has already seen the modal
    if (!localStorage.getItem("hasVisited")) {
      modal.classList.remove("hidden");
    }
  
    // Close modal on button click
    closeModal.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
  
    // Handle register button click
    registerBtn.addEventListener("click", () => {
      alert("Thank you for registering!");
      modal.classList.add("hidden");
      localStorage.setItem("hasVisited", "true");
    });
  });