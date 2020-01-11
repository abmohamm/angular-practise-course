const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.createUser = (request, response, next) => {
  bcrypt.hash(request.body.password, 10)
    .then(hash => {
      const user = new User({
        email: request.body.email,
        password: hash
      });
      user.save()
        .then(result => {
          response.status(201).json({
            message: 'User Created!',
            result: result
          });
        })
        .catch(error => {
          response.status(500).json({
            message: 'Invalid Authentication Credentials'
          });
        });
    });
}

exports.userLogin = (request, response, next) => {
  let fetchedUser;
  User.findOne({ email: request.body.email })
    .then(user => {
      if (!user) {
        return response.status(401).json({
          message: 'Authentication Failed'
        });
      }
      fetchedUser = user;
      return bcrypt.compare(request.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return response.status(401).json({
          message: 'Authentication Failed'
        });
      }
      const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id },
        process.env.JWT_KEY,
        { expiresIn: '1h' });
      response.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      });
    })
    .catch(error => {
      return response.status(401).json({
        message: 'Invalid Authentication Credentials'
      });
    });
}
