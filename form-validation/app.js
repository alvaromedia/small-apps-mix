const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const email = document.getElementById("email");
const phoneNumber = document.getElementById("tel");

const allInputs = [
  firstName,
  lastName,
  password,
  confirmPassword,
  email,
  phoneNumber,
];

const signupButton = document.querySelector(".signup-button");

// change the value for each input field
allInputs.forEach((input) => {
  input.addEventListener("change", (e) => {
    input.value = e.target.value;
  });
});

allInputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    e.target.nextElementSibling.innerText = "";
    e.target.style.boxShadow = "";
  });
});

// check inputs function
function check(element, condition, text) {
  if (condition) {
    element.style.boxShadow = "0 0 0 3px #D0342C";
    element.nextElementSibling.innerText = text;
    element.nextElementSibling.style.color = "#D0342C";
  }
}

// add event listener to the button and check each input
signupButton.addEventListener("click", (e) => {
  e.preventDefault();

  check(
    firstName,
    firstName.value.length < 4,
    "First name must be at least 4 characters"
  );
  check(
    lastName,
    lastName.value.length < 4,
    "Last name mut be at least 4 characters"
  );

  check(password, !password.value, "Please add a password");

  check(
    confirmPassword,
    confirmPassword.value !== password.value,
    "Password isn't matching"
  );

  check(email, !email.value, "Please input an email");
  check(email, email.validity.typeMismatch, "Email isn't valid");
});
