const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.post("/api/employees", (request,response,next) => {
    const employee = request.body;
    console.log("Employee Details : " + employee);
    response.status(201).json({
      message: "Records stored successfully",
      status: "OK",
      employees: employees
  });
});

app.use((request, response, next) => {
    request.setHeader("Access-Control-Allow-Origin","*");
    request.setHeader("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
    request.setHeader("Access-Control-Allow-Methods","GET,POST,PATCH,DELETE,OPTIONS,PUT");
    next();
});
app.get("/api/employees", (request,response,next) => {
  const employees = [
          {firstname: 'Steven', lastname: 'King', email: 'sking@gmail.com', jobid: 'AD_PRES', description: 'Program Manager'},
          {firstname: 'Neena', lastname: 'Kochhar', email: 'nkochhar@gmail.com', jobid: 'AD_VP', description: 'Application Developer'},
          {firstname: 'Lex', lastname: 'De haan', email: 'ldehaan@gmail.com', jobid: 'AD_VP', description: 'Vice President'},
          {firstname: 'Alexander', lastname: 'Hunold', email: 'ahunold@gmail.com', jobid: 'IT_PROG', description: 'QA Tester'},
          {firstname: 'Bruce', lastname: 'Ernst', email: 'bernst@gmail.com', jobid: 'AD_PRES', description: 'Data Analyst'}
  ];
  response.status(200).json({
      message: "Records retrieved successfully",
      status: "OK",
      employees: employees

  });
});

module.exports = app;
