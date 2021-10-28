const validateSignup = (req, res, next) => {
  req.body("email").isEmail(),
    req.body("phone").isMobilePhone(), // username must be is email
    req
      .body("password")
      .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
      })
      .withMessage(
        "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number"
      );

  req.getValidationResult(req).then(function (errors) {
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      next();
    }
  });
};

module.exports = {
  validateSignup,
};
