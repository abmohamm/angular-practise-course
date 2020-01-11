const express = require("express");
const checkAuth = require("../middle-ware/check-auth");
const extractMiddlewareFile = require("../middle-ware/middlewarefile");

const router = express.Router();
const employeeController = require("../controllers/employees");

router.post("", checkAuth, extractMiddlewareFile, employeeController.createEmployee);

router.put("/:employeeId", checkAuth, extractMiddlewareFile, employeeController.updateEmployee);

router.get("", employeeController.getEmployees);

router.get("/:employeeId", employeeController.getEmployee);

router.delete("/:employeeId", checkAuth, employeeController.deleteEmployee);

module.exports = router;

