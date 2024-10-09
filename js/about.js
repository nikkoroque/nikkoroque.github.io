console.error = function () {};

// Document Ready: Navbar Scroll and Date Update
$(document).ready(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $("header").addClass("sticky");
    } else {
      $("header").removeClass("sticky");
    }
  });

  // Auto-update the year in the footer
  document.onload = document.getElementById("autodate").innerHTML =
    new Date().getFullYear();
});

// Function to inject HTML content into a given section
function injectSection(url, elementId, callback = () => {}) {
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(elementId).innerHTML = data;
      callback(); // Call any additional logic after content is injected
    })
    .catch((error) => console.error(`Error loading ${elementId}:`, error));
}

// Function to inject shared sections (sections used on both pages)
function injectSharedSections(callback = () => {}) {
  injectSection("./components/Navbar.html", "navbar-container", function () {
    configurePageNavigation(); // Ensure that navbar is configured after it's injected
    callback(); // Continue loading other shared sections after navbar
  });
  injectSection("./components/Faq.html", "faq-section");
  injectSection("./components/Footer.html", "footer-section");
  injectSection("./containers/shared/ServiceSection.html", "service-section");
  injectSection("./containers/shared/ContactSection.html", "contact-section");
}

// About page sections
function injectAboutSections() {
  injectSection("./pages/about.html", "about-container");
  injectSection("./containers/about/Hero.html", "hero-about");
  injectSection("./containers/shared/WhySection.html", "why-section");
  injectSection("./containers/shared/FeatureSection.html", "feature-section");
  injectSection(
    "./containers/shared/ServiceSection.html",
    "about-service-section"
  );
  injectSection(
    "./containers/shared/ContactSection.html",
    "about-contact-section"
  );
  injectSection("./components/Faq.html", "about-faq-section");
}

function initializePage() {
  injectSharedSections();
  injectAboutSections();
}

// Run the initialization on page load
window.addEventListener("load", initializePage);
