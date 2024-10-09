console.error = function () {};

function handleRegister(event) {
  event.preventDefault();
  console.log("CLICKED!!");
  // Show the toast message
  showToast(
    "Success! You're now subscribed to our newsletter!",
    "info",
    "end-0"
  );
}

(function () {
  // Initialize EmailJS
  emailjs.init("user_K4DQFjNgm7nW1IPA2FcT0");
})();

function handleSubmit(event) {
  event.preventDefault();
  console.log("Form submitted"); // Verify if this gets logged in the console
  emailjs
    .sendForm(
      "service_yn2cadp",
      "template_esvutmj",
      document.getElementById("contact-form")
    )
    .then(
      () => {
        console.log("SUCCESS!");
        showToast("Success! Email Sent!", "info", "end-0");
        // Reset the form after successful submission
        document.getElementById("contact-form").reset();
      },
      (error) => {
        console.log("FAILED...", error);
        showToast("Oh no! We hit a snag! Please try again.", "error", "end-0");
      }
    );
  return false;
}

function showToast(content, type, position) {
  var delay = 3000;
  document.querySelector("#toast-container").classList.add(position);
  var html = `<div class="toast align-items-center text-white bg-${type} border-0" role="alert" aria-live="assertive" aria-atomic="true"><div class="d-flex"><div class="toast-body h6 p-3 m-0">${content}</div><button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button></div></div>`;
  var toast = htmlToElement(html);
  var toastContainer = document.querySelector("#toast-container");
  toastContainer.appendChild(toast);
  var toast = new bootstrap.Toast(toast, { delay: delay, animation: true });
  toast.show();
  setTimeout(() => toast.remove(), delay + 2000);
}

function htmlToElement(html) {
  var template = document.createElement("template");
  html = html.trim();
  template.innerHTML = html;
  return template.content.firstChild;
}
