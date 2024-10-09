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
  injectSection("./components/Faq.html", "services-faq-section");
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

function initializePage() {
  injectSharedSections();
  injectServiceSections();
}

// Run the initialization on page load
window.addEventListener("load", initializePage);
