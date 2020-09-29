function sendCreateInfo() {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.onload = function () {
    // Process our return data

    if (xmlHttp.status >= 200 && xmlHttp.status < 300) {
      // This will run when the request is successful
      console.log("success!", xmlHttp);
      const createEmailElem = document.getElementById("create-email-error");
      createEmailElem.innerText = "";
      const createPassElem = document.getElementById("create-password-error");
      createPassElem.innerText = "";
      window.location.href =
        "http://127.0.0.1:5500/vanilla_node_c/front/create_note.html";
    } else {
      // This will run when it's not
      console.log("The request failed!");
      const errors = JSON.parse(xmlHttp.statusText);
      console.log(errors);
      const createEmailElem = document.getElementById("create-email-error");
      createEmailElem.innerText = errors.emailError;
      const createPassElem = document.getElementById("create-password-error");
      createPassElem.innerText = errors.passError;
    }

    // This will run either way
    // All three of these are optional, depending on what you're trying to do
    //console.log("This always runs...");
  };
  const formData = new FormData(document.getElementById("create-form"));
  xmlHttp.open("POST", "http://127.0.0.1:3000/");
  xmlHttp.send(formData);
  console.log(xmlHttp.statusText);
}

function sendNewNote() {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.onload = function () {
    if (xmlHttp.status >= 200 && xmlHttp.status < 300) {
      window.location.href =
        "http://127.0.0.1:5500/vanilla_node_c/front/create_note.html";
      console.log("success!", xmlHttp);
    } else {
      const errors = JSON.parse(xmlHttp.statusText);
      console.log("The request failed!", errors);
      const loginEmailElem = document.getElementById("login-email-error");
      loginEmailElem.innerText = errors.emailError;
      const loginPassElem = document.getElementById("login-password-error");
      loginPassElem.innerText = errors.passError;
    }
  };
  const formData = new FormData(document.getElementById("login-form"));
  xmlHttp.open("POST", "http://127.0.0.1:3000/auth");
  xmlHttp.send(formData);
}
