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

// Function to toggle between home and about pages
function configurePageNavigation() {
  const aboutLink = document.getElementById("about-link");
  const servicesLink = document.getElementById("services-link");

  // About page link
  if (aboutLink) {
    aboutLink.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent the default link behavior

      // Toggle visibility of containers
      document.getElementById("home-container").style.display = "none";
      document.getElementById("services-container").style.display = "none";
      document.getElementById("about-container").style.display = "block";

      // Change the URL hash without reloading the page
      window.location.hash = "about";
    });
  }

  // Services page link
  if (servicesLink) {
    servicesLink.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent the default link behavior

      // Toggle visibility of containers
      document.getElementById("home-container").style.display = "none";
      document.getElementById("about-container").style.display = "none";
      document.getElementById("services-container").style.display = "block";

      // Change the URL hash without reloading the page
      window.location.hash = "services";
    });
  }
}

// Function to inject shared sections (sections used on both pages)
function injectSharedSections(callback = () => {}) {
  injectSection(
    "./shared/components/Navbar.html",
    "navbar-container",
    function () {
      configurePageNavigation(); // Ensure that navbar is configured after it's injected
      callback(); // Continue loading other shared sections after navbar
    }
  );
  injectSection("./shared/components/Faq.html", "faq-section");
  injectSection("./shared/components/Footer.html", "footer-section");
  injectSection("./containers/shared/ServiceSection.html", "service-section");
  injectSection("./containers/shared/ContactSection.html", "contact-section");
}

// Home page sections
function injectHomeSections() {
  injectSection("./pages/home.html", "home-container");
  injectSection("./containers/home/Hero.html", "hero");
  injectSection("./containers/shared/StepSection.html", "home-step-section");
  injectSection(
    "./containers/shared/ServiceSection.html",
    "home-service-section"
  );
  injectSection(
    "./containers/shared/OptimizeSection.html",
    "home-optimize-section"
  );
  injectSection(
    "./containers/shared/PricingSection.html",
    "home-pricing-section"
  );
  injectSection(
    "./containers/shared/ContactSection.html",
    "home-contact-section"
  );
  injectSection("./shared/components/Faq.html", "home-faq-section");
}

// About page sections
function injectAboutSections() {
  injectSection("./pages/about.html", "about-container");
  injectSection("./containers/about/Hero.html", "hero-about");
  injectSection("./containers/about/WhySection.html", "why-section");
  injectSection("./containers/about/FeatureSection.html", "feature-section");
  injectSection(
    "./containers/shared/ServiceSection.html",
    "about-service-section"
  );
  injectSection(
    "./containers/shared/ContactSection.html",
    "about-contact-section"
  );
  injectSection("./shared/components/Faq.html", "about-faq-section");
}

// Service page sections
function injectServiceSections() {
  injectSection("./pages/services.html", "services-container");
  injectSection("./containers/services/Hero.html", "hero-services");
  injectSection(
    "./containers/shared/ServiceSection.html",
    "services-service-section"
  );
  injectSection(
    "./containers/shared/PricingSection.html",
    "services-pricing-section"
  );
  injectSection(
    "./containers/shared/ContactSection.html",
    "services-contact-section"
  );
  injectSection("./shared/components/Faq.html", "services-faq-section");
}

// Initialize the page by checking the URL or hash
function initializePage() {
  const currentHash = window.location.hash;

  injectSharedSections(function () {
    // Callback to check page and inject specific sections after shared sections are loaded
    if (currentHash === "#about") {
      document.getElementById("home-container").style.display = "none";
      document.getElementById("services-container").style.display = "none";
      injectAboutSections();
      document.getElementById("about-container").style.display = "block";
    } else if (currentHash === "#services") {
      document.getElementById("home-container").style.display = "none";
      document.getElementById("about-container").style.display = "none";
      injectServiceSections();
      document.getElementById("services-container").style.display = "block";
    } else {
      document.getElementById("about-container").style.display = "none";
      document.getElementById("services-container").style.display = "none";
      injectHomeSections();
      document.getElementById("home-container").style.display = "block";
    }
  });
}

// Run the initialization on page load
window.addEventListener("load", initializePage);

// Handle hash change events (for back/forward navigation)
window.addEventListener("hashchange", initializePage);
