const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
  empFirstName: {type: String, required: true},
  empLastName: {type: String, required: true},
  empEmailId: {type: String, required: true},
  employeeId: {type: String, required: true},
  description: {type: String, required: true},
  imagePath: {type: String, required: true}
});

module.exports = mongoose.model('Employee',employeeSchema);
