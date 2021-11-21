const express = require("express");
const auth = require("../../middleware/auth");
const User = require("../../models/Users");
const router = express.Router();
// @route  GET api/auth
// @desc   Test route
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

module.exports = router;
