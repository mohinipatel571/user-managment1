const express = require("express");
const http = require("http");
const path = require("path");

const bodyParser = require("body-parser");
const userRouter = require("./router/userRouter");
const userLogin = require("./router/userLogin");
const checkUser = require("./router/checkUser");

var fileUpload = require("express-fileupload");
const userschema = require("./db/mogooseschema");

const hostname = "0.0.0.0";
const port = process.env.PORT || 5000;
const app = express();
app.use(express.static(path.join(__dirname, "public")));
// app.use(morgon('dev'));
// for parsing application/json
app.use(bodyParser.json());
app.use(fileUpload());
// for parsing application/xwww
//form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// for parsing multipart/form-data

app.use("/api/user", userRouter);

app.use("/api/authUser", userLogin);
app.use("/api/checkUser",checkUser);
app.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end(`<html>
    <title>This is index.html</title>
    <body>
    <h1>Index.HTML</h1>   
    <p>This is the contents of this file</p>
    </body>
    </html>`);
});

const server = http.createServer(app);

server.listen(port, () => {
  console.log("Server Running");
});
