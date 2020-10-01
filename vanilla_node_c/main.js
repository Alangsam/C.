const http = require("http");
const hostname = "127.0.0.1";
const port = 3000;
const sql = require("mysql");
const testing = require("./queries/testing");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const dataBase = sql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: "note_taking",
});

dataBase.connect(function (err) {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }

  console.log("Connected to database.");
});

//dataBase.end();

const qs = require("querystring");
const { regForForm, regForNoteForm } = require("./utils/regex");
const {
  createEmailValidity,
} = require("./utils/validation/createEmailValidity");
const {
  createPasswordValidation,
} = require("./utils/validation/createPasswordValidation");
const createUserQuery = require("./queries/createUser");
const {
  loginEmailValidation,
} = require("./utils/validation/loginEmailValidation");
const {
  loginPassValidation,
} = require("./utils/validation/loginPassValidation");
const findUser = require("./queries/findUser");
const {
  createNoteValidation,
} = require("./utils/validation/createNoteValidation");
const server = http.createServer((request, response) => {
  if (request.method == "POST") {
    let body = "";

    request.on("data", function (data) {
      body += data;

      // Too much POST data, kill the connection!
      // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
      if (body.length > 1e6) request.connection.destroy();
    });

    if (request.url === "/") {
      request.on("end", function () {
        const post = qs.parse(body);
        const userObj = regForForm(JSON.stringify(post));
        //console.log(body, userObj);
        const emailValidity = createEmailValidity(String(userObj.email));
        const passWordValidity = createPasswordValidation(
          String(userObj.password)
        );
        const newUser = {
          id: uuidv4(),
          email: userObj.email,
          password: userObj.password,
          created_at: Date.now(),
        };

        if (emailValidity === "" && passWordValidity === "") {
          response.setHeader("Content-Type", "application.json");
          response.setHeader("Access-Control-Allow-Origin", "*");
          response.statusCode = 200;
          response.end("Success");
          dataBase.query(createUserQuery, newUser, function (
            error,
            results,
            fields
          ) {
            if (error) throw error;
            console.log(results);
          });
        } else {
          response.setHeader("Content-Type", "application.json");
          response.setHeader("Access-Control-Allow-Origin", "*");
          response.statusCode = 400;
          response.statusMessage = JSON.stringify({
            emailError: emailValidity,
            passError: passWordValidity,
          });
          response.end("Failed");
        }
      });
    } else if (request.url === "/auth") {
      request.on("end", function () {
        const post = qs.parse(body);
        const userObj = regForForm(JSON.stringify(post));
        const emailValidity = loginEmailValidation(String(userObj.email));
        const passWordValidity = loginPassValidation(String(userObj.password));

        if (emailValidity === "" && passWordValidity === "") {
          dataBase.query(findUser, [userObj.email, userObj.password], function (
            error,
            results,
            fields
          ) {
            if (error) {
              throw error;
            } else if (results.length > 0) {
              console.log(results);
              response.setHeader("Content-Type", "application.json");
              response.setHeader("Access-Control-Allow-Origin", "*");
              response.statusCode = 200;
              response.end("Success");
            } else {
              response.setHeader("Content-Type", "application.json");
              response.setHeader("Access-Control-Allow-Origin", "*");
              response.statusCode = 400;
              response.statusMessage = JSON.stringify({
                emailError: "",
                passError: "Wrong Email or Password",
              });
              response.end("Failed");
            }
          });
        } else {
          response.setHeader("Content-Type", "application.json");
          response.setHeader("Access-Control-Allow-Origin", "*");
          response.statusCode = 400;
          response.statusMessage = JSON.stringify({
            emailError: emailValidity,
            passError: passWordValidity,
          });
          response.end("Failed");
        }
        // response.setHeader("Content-Type", "application.json");
        // response.setHeader("Access-Control-Allow-Origin", "*");
        // response.statusCode = 200;
        // response.end("Success");
      });
    } else if (request.url === "/createNote") {
      //recieve new note

      request.on("end", function () {
        const post = qs.parse(body);
        const userObj = regForNoteForm(JSON.stringify(post));
        const titleNoteValidation = createNoteValidation(
          userObj.title[0],
          userObj.body[0]
        );
        if (
          titleNoteValidation.titleVar === 0 ||
          titleNoteValidation.noteVar === 0
        ) {
          //validation === false
          response.setHeader("Content-Type", "application.json");
          response.setHeader("Access-Control-Allow-Origin", "*");
          response.statusCode = 400;
          response.end("Failed");
        } else {
          //validation === true
          response.setHeader("Content-Type", "application.json");
          response.setHeader("Access-Control-Allow-Origin", "*");
          response.statusCode = 200;
          response.end("Success");
          //add note to database
        }
      });
    }
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
