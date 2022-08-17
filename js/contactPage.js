function sendMail(params) {
  var tempParams = {
    from_name: document.getElementById("fromName").value,
    receiver_email: document.getElementById("fromEmail").value,
  };

  emailjs
    .send("service_p2hakwx", "template_7etje4a", tempParams)
    .then(function (res) {
      console.log("success", res.status);
    });
}
