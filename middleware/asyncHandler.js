// Handler function to wrap each route.
exports.asyncHandler = (cb) => {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      // Forward error to the global error handler
      next(error); //(a function that tells Express when to hand off processing to the next middleware in the request pipeline)
    }
  };
};