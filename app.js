const express = require('express');
const app = express();
const routes = require('./routes');
const db = require("./db");

let port = 3000;
db.connectDatabase();
routes.load(app);
app.listen(port, () => {
    console.log(`app listening on Port ${port}`);
})
