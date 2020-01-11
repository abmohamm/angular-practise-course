const Employee = require("../models/employee");


exports.createEmployee = (request, response, next) => {
  //  const employee = request.body;
  const url = request.protocol + '://' + request.get("host");
  const employee = new Employee({
    firstname: request.body.firstname,
    lastname: request.body.lastname,
    email: request.body.email,
    jobid: request.body.jobid,
    description: request.body.description,
    imagePath: url + "/images" + request.file.filename,
    creator: request.userData.userId
  });
  console.log("Employee Details : " + employee);
  employee.save()   // This Command will insert a document into database.
    .then(createdEmployee => {
      console.log("Employee Details : " + createdEmployee);
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
    })
    .catch(error => {
      response.status(500).json({
        message: 'Adding Information Process Failed!!!'
      });
    });
}

exports.updateEmployee = (request, response, next) => {
  let imagePath = request.body.imagePath;
  let url;
  if (request.file) {
    url = request.protocol + '://' + request.get("host");
    imagePath = url + "/images" + request.file.filename;
  }
  const employee = new Employee({
    firstname: request.body.firstname,
    lastname: request.body.lastname,
    email: request.body.email,
    jobid: request.body.jobid,
    description: request.body.description,
    imagePath: imagePath,
    creator: request.userData.userId
  });
  console.log("Employee Details : " + employee);
  Employee.updateOne({ _id: request.params.employeeId, creator: request.userData.userId }, employee)
    .then(result => {
      console.log("Employee Details : " + result);
      if (result.n > 0) {
        response.status(200).json({
          message: "Records Updated Successfully",
          status: "OK"
        });
      }
      else {
        response.status(401).json({
          message: "Not Authorized to Edit/update",
          status: "BAD AUTHENTICATION REQUEST"
        });
      }
    })
    .catch(error => {
      response.status(500).json({
        message: 'Updating Information Process Failed!!!'
      });
    });
}

exports.getEmployees = (request, response, next) => {
  const pageSize = +request.query.pagesize;
  const currentPage = +request.query.page;
  const employeeQuery = Employee.find();
  let fetchedEmployees;
  if (pageSize && currentPage) {
    employeeQuery.skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  employeeQuery.then((documents) => {
    console.log("Data Retrieved : " + documents);
    fetchedEmployees = documents;
    return Employee.count();
  }).then(count => {
    console.log("Employee Count : " + count);
    response.status(200).json({
      message: "Records retrieved successfully",
      status: "OK",
      employees: fetchedEmployees,
      maxEmployees: count
    });
  })
    .catch(error => {
      response.status(500).json({
        message: 'Fetching Information Process Failed!!!'
      });
    });
}

exports.getEmployee = (request, response, next) => {
  Employee.findById(request.params.employeeId)
    .then(employee => {
      if (employee) {
        console.log("Employee Details : " + employee);
        response.status(200).json(employee);
      } else {
        response.status(404).json({
          message: "Records Not Found"
        });
      }
    })
    .catch(error => {
      response.status(500).json({
        message: 'Fetching Information Process Failed!!!'
      });
    });
}

exports.deleteEmployee = (request, response, next) => {
  console.log("Employee Id : " + request.params.employeeId);
  Employee.deleteOne({ _id: request.params.employeeId, creator: request.userData.userId })
    .then(result => {
      if (result.n > 0) {
        response.status(200).json({
          message: "Record Deleted Successfully",
          status: "OK"
        });
      }
      else {
        response.status(401).json({
          message: "Not Authorized to Delete",
          status: "BAD AUTHENTICATION REQUEST"
        });
      }
    })
    .catch(error => {
      response.status(500).json({
        message: 'Deleting Information Process Failed!!!'
      });
    });
}
