const express = require("express");
const auth = require("../../middleware/auth");
const User = require("../../models/Users");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const config = require("config");
const jwt = require("jsonwebtoken");

// @route  GET api/auth
// @desc   Protected Route Middleware, returns User Info
// @access Public
router.get("/", auth, async (req, res) => {
  try {
    const user = User.findById(req.user.id, (err, data) => {
      return res.json(data);
    });
  } catch (err) {
    return res.status(400).json({ msg: "Server Error" });
  }
});

// @router POST api/auth
// @desc Login User and get token
// @access Public

// Validate post data, email and password
// check if a user with the email exists
// check if the password provided matches the user's password
// return jsonwebtoken

router.post(
  "/",
  body("email", "Please provide a valid email").isEmail(),
  body("password", "Password is required").not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("got errors");
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const payload = {
        user: { id: user.id },
      };

      jwt.sign(payload, config.get("jwtToken"), (err, token) => {
        if (err) {
          throw err;
        }
        return res.json({ token });
      });
    } catch (err) {
      return res.status(400).json({ errors: [{ msg: err }] });
    }
  }
);

module.exports = router;
