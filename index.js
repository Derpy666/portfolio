const form = document.getElementById('contact');
const modal = new bootstrap.Modal(document.getElementById('successModal'));

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const form = event.target;
    if (form.checkValidity()) {
        event.target[0].value = ""
        event.target[1].value = ""
        event.target[2].value = ""
      modal.show();
    } else {
      form.reportValidity();
    }
  });