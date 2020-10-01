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

function userAuth() {
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

function noteLengthValidation() {
  const noteArea = document.getElementById("note-text-area");
  const noteErrMessage = document.getElementById("note-error-message");
  if (noteArea.value.length === 0) {
    noteErrMessage.innerText = "Note Area Blank";
    noteArea.className = "form-control is-invalid";
  } else if (noteArea.value.length > 1000) {
    noteErrMessage.innerText = "Note must be less than 1000 Characters";
    noteArea.className = "form-control is-invalid";
  } else {
    noteErrMessage.innerText = "";
    noteArea.className = "form-control";
  }
}

function titleLengthValidation() {
  const titleArea = document.getElementById("note-title");
  const titleErrMessage = document.getElementById("title-error-message");
  if (titleArea.value.length === 0) {
    titleErrMessage.innerText = "Title cannot be Empty";
    titleArea.className = "form-control is-invalid";
  } else if (titleArea.value.length > 100) {
    titleErrMessage.innerText = "Title must be less than 101 characters";
    titleArea.className = "form-control is-invalid";
  } else {
    titleErrMessage.innerText = "";
    titleArea.className = "form-control";
  }
}

function sendNewNote() {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.onload = function () {
    if (xmlHttp.status >= 200 && xmlHttp.status < 300) {
      console.log("success!", xmlHttp);
    } else {
      console.log("Failure", xmlHttp);
    }
  };

  const formData = new FormData(document.getElementById("note-form"));
  console.log(formData);
  xmlHttp.open("POST", "http://127.0.0.1:3000/createNote");
  xmlHttp.send(formData);
}
