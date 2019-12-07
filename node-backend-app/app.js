const express = require('express');

const app = express();

app.use((request,response,next) => {
  console.log('<===first middle wares===>');
  next();
});

app.use((request,response,next) => {
    response.send('Hello from express js !!! :::::');
});

module.exports = app;
