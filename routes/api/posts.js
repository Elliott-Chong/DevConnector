const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Post = require("../../models/Post");
const User = require("../../models/Users");
const Profile = require("../../models/Profile");
const { body, validationResult } = require("express-validator");
// @route  GET api/posts
// @desc   Test route
// @access Public
router.post(
  "/",
  auth,
  body("text", "Text is required").not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    try {
      const user = await User.findById(req.user.id);
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      await newPost.populate("user");

      const post = await newPost.save();
      return res.json(post);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  }
);

router.get("/", auth, async (req, res) => {
  const posts = await Post.find().populate("user").sort({ date: -1 });
  return res.json(posts);
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("user");
    if (!post) return res.status(400).json({ msg: "Post not found" });
    return res.json(post);
  } catch (error) {
    if (error.kind === "ObjectId")
      return res.status(400).json({ msg: "Post not found" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.user.toString() === req.user.id) {
      await post.remove();
      return res.send("Post deleted");
    } else
      return res.status(400).json({
        errors: [
          { msg: "You cannot delete a post that doesn't belong to you" },
        ],
      });
  } catch (error) {
    console.error(error);
    return res.status(400).send("Server Error");
  }
});

router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const likes = post.likes;
    let tryingToDislike = false;
    likes.forEach((like) => {
      if (like.user.toString() === req.user.id) {
        tryingToDislike = true;
      }
    });
    if (tryingToDislike) {
      const newLikes = likes.filter(
        (like) => like.user.toString() !== req.user.id
      );
      post.likes = newLikes;
      await post.save();
      return res.json(post.likes);
    } else {
      post.likes.push({ user: req.user.id });
      await post.save();
      return res.json(post.likes);
    }
  } catch (error) {
    console.error(error);
    res.status(400).send("Server Error");
  }
});

router.post(
  "/comment/:id",
  auth,
  body("text", "Text is required").not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    try {
      const user = await User.findById(req.user.id);
      const post = await Post.findById(req.params.id);
      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: user,
      };
      post.comments.unshift(newComment);

      await post.save();
      return res.json(post.comments);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  }
);

router.delete("/comment/:comment_id/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    if (!comment) return res.status(404).json({ msg: "Comment not found" });
    if (comment.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "User not authorized" });

    const newComments = post.comments.filter(
      (comment) => comment.id !== req.params.comment_id
    );
    post.comments = newComments;
    await post.save();
    return res.json(post.comments);
  } catch (error) {
    console.error(error);
    return res.status(400).send("Server Error");
  }
});

module.exports = router;
