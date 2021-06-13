'use strict';

const express = require('express');
const Course = require('../models').Course;
const User = require('../models').User;

const { asyncHandler } = require('../middleware/asyncHandler');
const { authenticateUser } = require('../middleware/authUser');

// Construct a router instance.
const router = express.Router();

/* GET COURSES */
router.get('/courses', asyncHandler(async (req, res) => {
    const courses = await Course.findAll({
        include: [
          {
            model: User,
            as: "User",
          },
        ],
      });
    res.json(courses);
    // res.status(200)
 }));

   
  /* GET individual Course. */
router.get("/courses/:id", asyncHandler(async (req, res,next) => {
const course = await Course.findByPk(req.params.id,{
    include: [
      {
        model: User,
        as: "User",
      },
    ],
  });

if(course) {
    res.json(course); 
     // res.status(200)
} else {
    const err = new Error();
    res.status(404);
    err.message = "This course does not exists.";
    next(err);
}
}));
  
/* POST create Course. */
  router.post('/courses',  authenticateUser,asyncHandler(async (req, res) => {
    let course;
    try {
      course = await Course.create(req.body);
      res.location(`/courses/${course.id}`);
      res.status(201).end();
    } catch (error) {
      if( 
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError") 
      {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }  
    }
  }));
  
  /**Update Course */
  router.put('/courses/:id', authenticateUser, asyncHandler(async (req, res,next) => {
  let course;
    try {
      course = await Course.findByPk(req.params.id);
      if(course) {  
        await course.update(req.body);
        res.status(204).end();
      } else {
        const err = new Error();
        err.status = 404;
        next(err);
      }
    } catch (error) {
      if(        
       error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError") {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });  
    } else {
        throw error;
      }
    }
  }));
  
  /* route to delete a Course */
  router.delete('/courses/:id',authenticateUser, asyncHandler(async (req ,res,next) => {
    const course = await Course.findByPk(req.params.id);
    if(course){
      await course.destroy();
      res.status(204).end();
    }else{
        const err = new Error();
        err.status = 404;
        next(err);
    }  
  })
  );

module.exports = router;