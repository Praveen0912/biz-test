const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require('method-override');
const path = require('path');
const cors = require('cors');

//routes path import 
const routes = require('./api/routes/index');
const userRoutes = require('./api/routes/user');

mongoose.Promise = global.Promise;

mongoose.connect(
        'mongodb://testtask:testtask123@ds231207.mlab.com:31207/testtask', {
            useMongoClient: true
        }
    ).then(result => {
        console.log("connected");
    })
    .catch(err => {
        console.log(err);
    });


app.use(morgan("dev"));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public/biz2credit-panel/dist/biz2credit-panel')));  

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

app.use(methodOverride());


// Routes which should handle requests
app.use("/user", userRoutes);
app.use("/", routes); // to return angular index file should be after all routes

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;