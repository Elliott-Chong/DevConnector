const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
// @route  GET api/profile/me
// @desc   Test route
// @access Public
router.get("/", auth, async (req, res) => {
  const id = req.user.id;
  try {
    const profile = await Profile.findOne({ user: id }).populate("user");
    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(200).json({ profile });
  } catch (err) {
    console.error(err);
    res.status(400).send("Server Error");
  }
});

module.exports = router;
