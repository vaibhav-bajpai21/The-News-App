const express = require('express');
const app = express();
const routes = require('./routes');
const db = require("./db");
const bodyParser = require("body-parser");
const cors = require("cors");

let port = process.env.PORT;
db.connectDatabase();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/temp-storage"));
app.set('view engine', 'ejs');
app.use(cors());
routes.load(app);
app.listen(port, () => {
    console.log(`app listening on Port ${port}`);
})
