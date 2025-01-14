const hamburger = document.querySelector(".hamburger");
const mobileNav = document.querySelector(".mobile-nav");
const mobileDropdown = document.querySelector(".mobile-dropdown");
const dropdownToggle = document.querySelector(".dropdown-toggle");

// Toggle Mobile Nav
hamburger.addEventListener("click", () => {
  mobileNav.classList.toggle("active");
});

// Toggle Mobile Dropdown with Arrow
dropdownToggle.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent default link behavior
  mobileDropdown.classList.toggle("active");
});
