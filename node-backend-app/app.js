const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Employee = require("./models/employee");

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
app.post("/api/employees", (request,response,next) => {
    //  const employee = request.body;
    const employee = new Employee({firstname: request.body.firstname,
                                   lastname: request.body.lastname,
                                   email: request.body.email,
                                   jobid: request.body.jobid,
                                   description: request.body.description});
    console.log("Employee Details : " + employee);
    employee.save()   // This Command will insert a document into database.
            .then(createdEmployee => {
              response.status(201).json({
                message: "Records stored successfully",
                status: "OK",
                id: createdEmployee._id
            });
      });
});

app.use((request, response, next) => {
    response.setHeader("Access-Control-Allow-Origin","*");
    response.setHeader("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
    response.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,PATCH,DELETE,OPTIONS,PUT");
    next();
});

app.get("/api/employees", (request,response,next) => {
  // const employees = [
  //         {firstname: 'Steven', lastname: 'King', email: 'sking@gmail.com', jobid: 'AD_PRES', description: 'Program Manager'},
  //         {firstname: 'Neena', lastname: 'Kochhar', email: 'nkochhar@gmail.com', jobid: 'AD_VP', description: 'Application Developer'},
  //         {firstname: 'Lex', lastname: 'De haan', email: 'ldehaan@gmail.com', jobid: 'AD_VP', description: 'Vice President'},
  //         {firstname: 'Alexander', lastname: 'Hunold', email: 'ahunold@gmail.com', jobid: 'IT_PROG', description: 'QA Tester'},
  //         {firstname: 'Bruce', lastname: 'Ernst', email: 'bernst@gmail.com', jobid: 'AD_PRES', description: 'Data Analyst'}
  // ];
  Employee.find()
          .then((documents) => {
              console.log("Data Retrieved : " + documents);
              response.status(200).json({
                message: "Records retrieved successfully",
                status: "OK",
                employees: documents
            });
          });
});

app.put("/api/employees/:employeeId",(request, response, next) => {
  const employee = new Employee({firstname: request.body.firstname,
                                 lastname: request.body.lastname,
                                 email: request.body.email,
                                 jobid: request.body.jobid,
                                 description: request.body.description});
  Employee.updateOne({_id: request.params.employeeId}, employee)
          .then(result => {
              console.log("Employee Details : "+result);
              response.status(200).json({
                message: "Records Updated Successfully",
                status: "OK"
            });
      });
});

app.delete("/api/employees/:employeeId",(request, response, next) => {
    console.log("Employee Id : "+request.params.employeeId);
    Employee.deleteOne({_id: request.params.employeeId})
            .then(result => {
                consule.log('Result : ' + result);
                response.status(200).json({
                  message: "Records deleted successfully",
                  status: "OK"
          });
    });
});

module.exports = app;
