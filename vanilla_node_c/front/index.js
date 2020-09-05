function sendCreateInfo() {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.onload = function () {
    // Process our return data
    if (xmlHttp.status >= 200 && xmlHttp.status < 300) {
      // This will run when the request is successful
      console.log("success!", xmlHttp);
    } else {
      // This will run when it's not
      console.log("The request failed!");
    }

    // This will run either way
    // All three of these are optional, depending on what you're trying to do
    console.log("This always runs...");
  };
  const formData = new FormData(document.getElementById("create-form"));

  xmlHttp.open("POST", "http://127.0.0.1:3000/");

  xmlHttp.send(formData);
  console.log(xmlHttp.response);
}
