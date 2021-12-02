const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/Users");
const Profile = require("../../models/Profile");
const { body, validationResult } = require("express-validator");
const config = require("config");
const axios = require("axios");
const Users = require("../../models/Users");
// @route  GET api/profile/me
// @desc   Test route
// @access Public
router.get("/me", auth, async (req, res) => {
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

router.post(
  "/",
  auth,
  body("status", "status is required").not().isEmpty(),
  body("skills", "skills is required").not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const {
      company,
      website,
      location,
      status,
      skills,
      bio,
      githubusername,
      youtube,
      facebook,
      instagram,
      linkedin,
      twitter,
    } = req.body;

    const profileFields = { user: req.user.id };
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (status) profileFields.status = status;
    if (bio) profileFields.bio = bio;
    if (githubusername) profileFields.githubusername = githubusername;

    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }

    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (twitter) profileFields.social.twitter = twitter;

    const userProfile = await Profile.findOne({ user: req.user.id });
    if (!userProfile) {
      const newUserProfile = await new Profile(profileFields);
      await newUserProfile.save();
      return res.json({ profile: newUserProfile });
    } else {
      const yes = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json({ profile: yes });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user");
    res.json(profiles);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    await user.remove();
    res.send("Account Deleted");
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

router.get("/user/:user_id", async (req, res) => {
  try {
    const profiles = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user");
    if (!profiles) return res.status(400).json({ msg: "Profile not found" });
    res.json({ profiles });
  } catch (error) {
    console.error(error.message);
    if (error.kind == "ObjectId")
      return res.status(400).json({ msg: "Profile not found" });
    res.status(500).send("Server Error");
  }
});

router.delete("/", auth, async (req, res) => {
  try {
    await Profile.findOneAndDelete({ user: req.user.id });
    await User.findOneAndDelete({ _id: req.user.id });
    res.send("User Deleted");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.put(
  "/experience",
  auth,
  body("title", "Experience is required").not().isEmpty(),
  body("company", "Company is required").not().isEmpty(),
  body("from", "From is required").not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    try {
      const { title, company, location, from, to, current, description } =
        req.body;
      const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description,
      };
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);
      await profile.save();
      return res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const newExp = profile.experience.filter((exp) => {
      return exp._id.toString() !== req.params.exp_id;
    });
    console.log(newExp);
    profile.experience = newExp;
    await profile.save();
    return res.send("Experience deleted!");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.put(
  "/education",
  auth,
  body("school", "School is required").not().isEmpty(),
  body("degree", "degree is required").not().isEmpty(),
  body("fieldofstudy", "Field of study is required").not().isEmpty(),
  body("from", "From is required").not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    try {
      const { school, degree, fieldofstudy, from, to, current, description } =
        req.body;
      const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description,
      };
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEdu);
      await profile.save();
      return res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const newExp = profile.education.filter((exp) => {
      return exp._id.toString() !== req.params.edu_id;
    });
    profile.education = newExp;
    await profile.save();
    return res.send("Education deleted");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.get("/github/:username", async (req, res) => {
  try {
    const url = `https://api.github.com/users/${
      req.params.username
    }/repos?per_page=5&sort=created:asc&client_id=${config.get(
      "clientId"
    )}&client_secret=${config.get("clientSecret")}}`;

    const options = {
      headers: {
        "user-agent": "nodejs",
      },
    };
    try {
      const response = await axios({
        method: "get",
        headers: {
          "user-agent": "nodejs",
        },
        url,
      });
      return res.json(response.data);
    } catch (error) {
      return res.send("No github user found with that username");
    }
  } catch (error) {
    console.error(error);
    return res.send("Server Error");
  }
});

module.exports = router;
