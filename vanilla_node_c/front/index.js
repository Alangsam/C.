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
    console.log("This always runs...");
  };
  const formData = new FormData(document.getElementById("create-form"));
  xmlHttp.open("POST", "http://127.0.0.1:3000/");
  xmlHttp.send(formData);
  console.log(xmlHttp.statusText);
}

function sendNewNote() {
  const postNote = new XMLHttpRequest();
  postNote.onload = function () {
    if (postNote.status >= 200 && postNote.status < 300) {
      console.log("success!", xmlHttp);
    } else {
      console.log("The request failed!");
    }
  };
  postNote.open("POST", "http://127.0.0.1:3000/new-note");
  postNote.send("hello");
}
