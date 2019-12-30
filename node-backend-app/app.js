const path = require("path");
const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const employeeRoutes = require("./routes/employees");
const userRoutes = require("./routes/users");

const app = express();
mongoose.connect("mongodb+srv://admin:5ZXMq7Mphz2A4oHY@testcluster-hqygl.mongodb.net/test?retryWrites=true&w=majority")
        .then(() => {
            console.log('Connected to Database Successfully!!!');
        })
        .catch(() => {
            console.log('Connection Failed!!!');
        });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use("/images", express.static(path.join("node-backend-app/images")))

app.use((request, response, next) => {
    response.setHeader("Access-Control-Allow-Origin","*");
    response.setHeader("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept,Authorization");
    response.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,PATCH,DELETE,OPTIONS,PUT");
    next();
});

app.use("/api/employees", employeeRoutes);
app.use("/api/user",  userRoutes);

module.exports = app;
