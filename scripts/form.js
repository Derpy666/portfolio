const formContact = document.getElementById('contact');
const modal = new bootstrap.Modal(document.getElementById('successModal'));
const button = document.getElementById("submit")

const nameRegex = /^[a-zA-Zא-ת\s]+$/;
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

function checkFormValidity() {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message")

  const isNameValid = nameRegex.test(name.value);
  const isEmailValid = emailRegex.test(email.value);
  const isMessageVaild = message.value != ""

  button.disabled = !(isNameValid && isEmailValid && isMessageVaild);
}

function checkRegex(element, regex) {
  if(regex.test(element.value)) {
    element.style.borderColor = "lime"
    element.style.borderWidth = "2px"
  } else {
    element.style.borderColor = "red"
    element.style.borderWidth = "2px"
  }
}

formContact.addEventListener("input", function (event) {
  const element = document.getElementById(event.target.id);

  if (element.id == "name") checkRegex(element, nameRegex)
  if (element.id == "email") checkRegex(element, emailRegex)

  if(element.id == "message") {
    if(element.value == "") {
      element.style.borderColor = "red"
      element.style.borderWidth = "2px"
    } else {
      element.style.borderColor = "lime"
      element.style.borderWidth = "2px"
    }
  }

    checkFormValidity()
})

const formEvent = formContact.addEventListener("submit", function (event) {
    event.preventDefault();

    for (let input of event.target) {
      if(input.type != "submit") {
        input.style.borderColor = ""
        input.style.borderWidth = ""
      }
    }

    const form = event.target;
    if (form.checkValidity()) {
        form.reset();
        modal.show();
    } else {
      form.reportValidity();
    }
  });  

export { formEvent }