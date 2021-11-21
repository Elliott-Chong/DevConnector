const express = require("express");
const router = express.Router();

// @route  GET api/peofile
// @desc   Test route
// @access Public
router.get("/", (req, res) => res.json("Profile route"));

module.exports = router;
