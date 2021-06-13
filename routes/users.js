'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models').User;

const { asyncHandler } = require('../middleware/asyncHandler');
const { authenticateUser } = require('../middleware/authUser');

// Construct a router instance.
const router = express.Router();

// Route that returns a list of users.
router.get('/users',authenticateUser,asyncHandler(async (req, res) => {
  const user = req.currentUser;
  // Retrieve authenticated user info
  const authUser = await User.findByPk(user.id);
  // If current user is an authenticated user, return info in JSON
  if (authUser) {
    res.json(authUser);
  } else {
    throw new Error();
  }

})
);
// Route that creates a new user.
router.post('/users',   asyncHandler(async (req, res) => {
  try {
    await Users.create(req.body);
    res.location("/");
    res.status(201).json({ message: "Account successfully created!" });
    res.end();
  } catch (error) {
    console.log("ERROR: ", error.name);
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      const errors = error.errors.map((err) => err.message);
      res.status(400).json({ errors });
    } else {
      throw error;
    }
  }
})
);

module.exports = router;