const express = require('express');
const app = express();
// const expressValidator = require('express-validator')
const setRoute = require("./router")
const bodyParser = require('body-parser');


// app.use(expressValidator())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen('8080', () => {
    console.log("Server start on port 8080")
    // console.log("hello world")
    setRoute(app)
})


