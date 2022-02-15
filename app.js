const express = require('express');
const app = express();
const routes = require('./routes');
const db = require("./db");
const bodyParser = require("body-parser")

let port = 3000;
db.connectDatabase();
app.use(bodyParser.json());
routes.load(app);
app.listen(port, () => {
    console.log(`app listening on Port ${port}`);
})
