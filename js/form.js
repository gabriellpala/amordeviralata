const form = document.getElementById("contactForm");
form.addEventListener("submit", handleSubmit);

async function sendEmail(name, email, phone, message) {
  let formData = new FormData();
  formData.append("nome", name);
  formData.append("email", email);
  formData.append("telefone", phone);
  formData.append("mensagem", message);

  await fetch("/php/enviar-email.php", {
    body: formData,
    method: "post",
  })
    .then((data) => console.log(data))
    .catch((error) => console.log("error"));
}

function handleSubmit(e) {
  e.preventDefault();

  let name = form.querySelector("#name").value;
  let email = form.querySelector("#email").value;
  let phone = form.querySelector("#phone").value;
  let message = form.querySelector("#message").value;

  sendEmail(name, email, phone, message);
}
