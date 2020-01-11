const express = require("express");
const multer = require("multer");
const checkAuth = require("../middle-ware/check-auth");
const router = express.Router();
const employeeController = require("../controllers/employees");

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid Mime Type");
    if (isValid) {
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


router.post("", checkAuth,
                multer({ storage: storage }).single("image"), employeeController.createEmployee);

router.put("/:employeeId", checkAuth,
                           multer({ storage: storage }).single("image"), employeeController.updateEmployee);

router.get("", employeeController.getEmployees);

router.get("/:employeeId", employeeController.getEmployee);

router.delete("/:employeeId", checkAuth, employeeController.deleteEmployee);

module.exports = router;

