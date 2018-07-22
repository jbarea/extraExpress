const express = require('express');
const Sequelize = require('sequelize');

const app = express();



app.use('/users/',require('./routes/users'));

app.listen(8080);//no le ponemos callback

module.exports = app;