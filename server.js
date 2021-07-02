const express = require('express');
const app = express();
const setRoute = require("./router")
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen('8080', () => {
    console.log("Server start on port 8080")
    // console.log("hello world")
    setRoute(app)
})


