const express = require("express");
const multer =  require("multer");

const Employee = require("../models/employee");
const checkAuth = require("../middle-ware/check-auth");

const router = express.Router();

const MIME_TYPE_MAP = {
'image/png': 'png',
'image/jpeg': 'jpg',
'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
      const isValid = MIME_TYPE_MAP[file.mimetype];
      let error = new Error("Invalid Mime Type");
      if(isValid) {
        error = null;
      }
      callback(error, "node-backend-app/images");
  },
  filename: (request, file, callback) => {
      const name = file.originalname.toLowerCase().split(' ').join('-');
      const extension = MIME_TYPE_MAP[file.mimetype];
      callback(null, name + '-' + Date.now() + '.' + extension);
  }
});


router.post("",
            checkAuth,
            multer({storage: storage}).single("image"),
            (request,response,next) => {
  //  const employee = request.body;
  const url = request.protocol + '://' + request.get("host");
  const employee = new Employee({firstname: request.body.firstname,
                                 lastname: request.body.lastname,
                                 email: request.body.email,
                                 jobid: request.body.jobid,
                                 description: request.body.description,
                                 imagePath: url + "/images" + request.file.filename,
                                 creator: request.userData.userId});
  console.log("Employee Details : " + employee);
  employee.save()   // This Command will insert a document into database.
          .then(createdEmployee => {
            response.status(201).json({
              message: "Records stored successfully",
              status: "OK",
              employee: {
                  // ...createdEmployee,
                  employeeId: createdEmployee.employeeId,
                  empFirstName: createdEmployee.empFirstName,
                  empLastName: createdEmployee.empLastName,
                  empEmailId: createdEmployee.empEmailId,
                  description: createdEmployee.description,
                  imagePath: createdEmployee.imagePath
              }
          });
    });
});

router.put("/:employeeId", checkAuth, multer({storage: storage}).single("image"), (request, response, next) => {
                      let imagePath = request.body.imagePath;
                      let url;
                      if(request.file) {
                        url = request.protocol + '://' + request.get("host");
                        imagePath = url + "/images" + request.file.filename;
                      }
                      const employee = new Employee({firstname: request.body.firstname,
                                                    lastname: request.body.lastname,
                                                    email: request.body.email,
                                                    jobid: request.body.jobid,
                                                    description: request.body.description,
                                                    imagePath: imagePath});
  Employee.updateOne({_id: request.params.employeeId, creator: request.userData.userId}, employee)
          .then(result => {
              console.log("Employee Details : "+result);
              if (result.nModified > 0) {
                  response.status(200).json({
                    message: "Records Updated Successfully",
                    status: "OK"
                });
              }
              else{
                  response.status(401).json({
                    message: "Not Authorized to Edit/update",
                    status: "BAD AUTHENTICATION REQUEST"
                });
              }
      });
});

router.get("", (request,response,next) => {
    const pageSize = +request.query.pagesize;
    const currentPage = +request.query.page;
    const employeeQuery = Employee.find();
    let fetchedEmployees;
    if(pageSize && currentPage) {
      employeeQuery.skip(pageSize * (currentPage - 1))
                   .limit(pageSize);
    }
    employeeQuery.then((documents) => {
      console.log("Data Retrieved : " + documents);
      fetchedEmployees = documents;
      return Employee.count();
    }).then(count => {
      response.status(200).json({
        message: "Records retrieved successfully",
        status: "OK",
        employees: fetchedEmployees,
        maxEmployees: count
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

router.delete("/:employeeId",
              checkAuth,
             (request, response, next) => {
    console.log("Employee Id : "+request.params.employeeId);
    Employee.deleteOne({  _id: request.params.employeeId,creator: request.userData.userId })
            .then(result => {
              if (result.n > 0) {
                response.status(200).json({
                  message: "Record Deleted Successfully",
                  status: "OK"
              });
            }
            else{
                response.status(401).json({
                  message: "Not Authorized to Delete",
                  status: "BAD AUTHENTICATION REQUEST"
              });
          }
    });
});

module.exports = router;

