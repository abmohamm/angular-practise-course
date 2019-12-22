const express = require("express");
const router = express.Router();
const Employee = require("../models/employee");


router.post("", (request,response,next) => {
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

router.put("/:employeeId",(request, response, next) => {
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

router.get("", (request,response,next) => {
    // const employees = [
    //         {firstname: 'Steven', lastname: 'King', email: 'sking@gmail.com', jobid: 'AD_PRES', description: 'Program Manager'},
    //         {firstname: 'Neena', lastname: 'Kochhar', email: 'nkochhar@gmail.com', jobid: 'AD_VP', description: 'routerlication Developer'},
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

router.get("/:employeeId", (request, response, next) => {
    Employee.findById(request.params.employeeId)
            .then(employee => {
                if(employee){
                    response.status(200).json(employee);
                } else{
                    response.status(404).json({
                        message: "Records Not Found"
                      });
                }
        });
});

router.delete("/:employeeId",(request, response, next) => {
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

module.exports = router;

