const http = require("http");
const hostname = "127.0.0.1";
const port = 3000;

const sql = require("mysql");
const testing = require("./queries/testing");
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

// dataBase.query(testing, function (error, results, fields) {
//   if (error) throw error;
//   console.log(results);
// });

dataBase.end();

// const server = http.createServer((req, res) => {
//   //console.log(req.url);

//   //res.statusCode = 200;
//   // res.setHeader("Content-Type", "text/plain");
//   // res.end("Hello, World!\n");

//   let body = [];
//   req
//     .on("data", (chunk) => {
//       body.push(chunk);
//     })
//     .on("end", () => {
//       body = Buffer.concat(body).toString();
//       // at this point, `body` has the entire request body stored in it as a string
//     });
//   console.log(req);
// });

const qs = require("querystring");
const { regForForm } = require("./utils/regex");

const server = http.createServer((request, response) => {
  if (request.method == "POST") {
    let body = "";

    request.on("data", function (data) {
      body += data;

      // Too much POST data, kill the connection!
      // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
      if (body.length > 1e6) request.connection.destroy();
    });

    request.on("end", function () {
      const post = qs.parse(body);
      const userObj = regForForm(JSON.stringify(post));
      console.log(userObj);
    });

    response.setHeader("Content-Type", "application.json");
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.statusCode = 200;
    response.end("Hello");
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
