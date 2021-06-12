'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const { Sequelize } = require('sequelize');
// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

// setup morgan which gives us http request logging
app.use(morgan('dev'));

var { sequelize, models }  = require('./models').sequelize;
//const { sequelize, models } = require('./db');
const { User, Course } = models;

let FernandaSesnick;
let JavaScript;

(async () => {
 await sequelize.sync();
  try {
    await sequelize.authenticate();
    console.log('Connection to databse established.');
   
   const userInstances = await promiseFinally.all([ User.create({
      firstName:'Fernanda',
      lastName: 'Sesnick',
      emailAddress:'fernanda@gmail.com',
      password: 'fernandinha123',
    }),

   ]);
   console.log(JSON.stringify(userInstances, null, 2));
   FernandaSesnick = userInstances ;

   console.log('Adding course to the database...');
   const courseInstances = await Promise.all([ 
     Course.create({
       title: 'Java Script',
       description: 'Full Stack course',
       materialsNeeded: 'Laptop',
       userId: FernandaSesnick.id,
     })
   ]);
   console.log(JSON.stringify(courseInstances, null, 2));
   JavaScript = courseInstances;
   process.exit();

  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message);
      console.error('Validation errors: ', errors);
    } else {
      throw error;
    }
  }
})();



// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});

