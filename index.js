const formContact = document.getElementById('contact');
const modal = new bootstrap.Modal(document.getElementById('successModal'));

formContact.addEventListener('submit', function (event) {
    event.preventDefault();

    const form = event.target;
    if (form.checkValidity()) {
        form.reset();
        modal.show();
    } else {
      form.reportValidity();
    }
  });