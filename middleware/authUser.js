'use strict';

const auth = require('basic-auth');
const { User } = require('../models');
const bcrypt = require('bcrypt');

/**
 * Middleware to authenticate the request using Basic Authentication.
 * @param {Request} req - The Express Request object.
 * @param {Response} res - The Express Response object.
 * @param {Function} next - The function to call to pass execution to the next middleware.
 */
exports.authenticateUser = async (req, res, next) => {
  let message;

  const credentials = auth(req);

  if (credentials) {
    const user = await User.findOne({ where: {emailAddress: credentials.name} });
    if (user) {
      const authenticated = bcrypt
        .compareSync(credentials.pass, user.password); //compareSync returns true if senha matches or false if don't
      if (authenticated) {
        console.log(`Authentication successful for username: ${user.firstName}`);

        // Store the user on the Request object.
        req.currentUser = user;
      } else {
        message = `Authentication failure for username: ${user.username}`;
      }
    } else {
      message = `User not found for username: ${credentials.name}`;
    }
  } else {
    message = 'Auth header not found';
  }

  if (message) {
    console.warn(message);
    res.status(401).json({ message: 'Access Denied' });
  } else {
    next();
  }
};


  // Parse the user's credentials from the Authorization header.

  // If the user's credentials are available...
     // Attempt to retrieve the user from the data store
     // by their username (i.e. the user's "key"
     // from the Authorization header).

  // If a user was successfully retrieved from the data store...
     // Use the bcrypt npm package to compare the user's password
     // (from the Authorization header) to the user's password
     // that was retrieved from the data store.

  // If the passwords match...
     // Store the retrieved user object on the request object
     // so any middleware functions that follow this middleware function
     // will have access to the user's information.

  // If user authentication failed...
     // Return a response with a 401 Unauthorized HTTP status code.

  // Or if user authentication succeeded...
     // Call the next() method.