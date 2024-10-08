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
    callback(); // Continue loading other shared sections after navbar
  });
  injectSection("./components/Faq.html", "faq-section");
  injectSection("./components/Footer.html", "footer-section");
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
  injectSection("./components/Faq.html", "home-faq-section");
}

function initializePage() {
  injectSharedSections();
  injectHomeSections();
}

// Run the initialization on page load
window.addEventListener("load", initializePage);

var basePrices = [599, 799, 999];

function updatePrices() {
  var condition = document.getElementById("flexSwitchCheckChecked").checked;
  var prices = document.getElementsByClassName("price");
  var base = document.querySelectorAll("[id='base']");

  for (var i = 0; i < prices.length; i++) {
    if (basePrices.length === 0) {
      basePrices.push(parseInt(prices[i].innerHTML));
    }

    if (condition) {
      prices[i].innerHTML = currencyFormatter(basePrices[i] * 11);
      base[i].innerHTML = "Yearly";
    } else {
      prices[i].innerHTML = basePrices[i];
      base[i].innerHTML = "Monthly";
    }
  }
}

function currencyFormatter(amount) {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
