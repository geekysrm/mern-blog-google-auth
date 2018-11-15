const passport = require("passport");
const express = require("express");

const Post = require("../../models/Post");

module.exports = app => {
  app.get("/posts/test", (req, res) => res.json({ msg: "Posts Works" }));

  // @route   GET api/posts
  // @desc    Get posts
  // @access  Public
  app.get("/posts", (req, res) => {
    Post.find()
      .sort({ date: -1 })
      .then(posts => res.json(posts))
      .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
  });

  // @route   GET api/posts/:id
  // @desc    Get post by id
  // @access  Public
  app.get("/posts/:id", (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        if (post) {
          res.json(post);
        } else {
          res.status(404).json({ nopostfound: "No post found with that ID" });
        }
      })
      .catch(err =>
        res.status(404).json({ nopostfound: "No post found with that ID" })
      );
  });

  // @route   POST api/posts
  // @desc    Create post
  // @access  Private
  app.post("/posts/create/", (req, res) => {
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });
    console.log(req.body.text);
    // res.send("done");
    newPost.save().then(post => res.json(post));
  });

  // // @route   DELETE api/posts/:id
  // // @desc    Delete post
  // // @access  Private
  // app.delete(
  //   "/:id",
  //   passport.authenticate("jwt", { session: false }),
  //   (req, res) => {
  //     Profile.findOne({ user: req.user.id }).then(profile => {
  //       Post.findById(req.params.id)
  //         .then(post => {
  //           // Check for post owner
  //           if (post.user.toString() !== req.user.id) {
  //             return res
  //               .status(401)
  //               .json({ notauthorized: "User not authorized" });
  //           }

  //           // Delete
  //           post.remove().then(() => res.json({ success: true }));
  //         })
  //         .catch(err =>
  //           res.status(404).json({ postnotfound: "No post found" })
  //         );
  //     });
  //   }
  // );

  // // @route   POST api/posts/like/:id
  // // @desc    Like post
  // // @access  Private
  // app.post(
  //   "/like/:id",
  //   passport.authenticate("jwt", { session: false }),
  //   (req, res) => {
  //     Profile.findOne({ user: req.user.id }).then(profile => {
  //       Post.findById(req.params.id)
  //         .then(post => {
  //           if (
  //             post.likes.filter(like => like.user.toString() === req.user.id)
  //               .length > 0
  //           ) {
  //             return res
  //               .status(400)
  //               .json({ alreadyliked: "User already liked this post" });
  //           }

  //           // Add user id to likes array
  //           post.likes.unshift({ user: req.user.id });

  //           post.save().then(post => res.json(post));
  //         })
  //         .catch(err =>
  //           res.status(404).json({ postnotfound: "No post found" })
  //         );
  //     });
  //   }
  // );

  // // @route   POST api/posts/unlike/:id
  // // @desc    Unlike post
  // // @access  Private
  // app.post(
  //   "/unlike/:id",
  //   passport.authenticate("jwt", { session: false }),
  //   (req, res) => {
  //     Profile.findOne({ user: req.user.id }).then(profile => {
  //       Post.findById(req.params.id)
  //         .then(post => {
  //           if (
  //             post.likes.filter(like => like.user.toString() === req.user.id)
  //               .length === 0
  //           ) {
  //             return res
  //               .status(400)
  //               .json({ notliked: "You have not yet liked this post" });
  //           }

  //           // Get remove index
  //           const removeIndex = post.likes
  //             .map(item => item.user.toString())
  //             .indexOf(req.user.id);

  //           // Splice out of array
  //           post.likes.splice(removeIndex, 1);

  //           // Save
  //           post.save().then(post => res.json(post));
  //         })
  //         .catch(err =>
  //           res.status(404).json({ postnotfound: "No post found" })
  //         );
  //     });
  //   }
  // );

  // // @route   POST api/posts/comment/:id
  // // @desc    Add comment to post
  // // @access  Private
  // app.post(
  //   "/comment/:id",
  //   passport.authenticate("jwt", { session: false }),
  //   (req, res) => {
  //     const { errors, isValid } = validatePostInput(req.body);

  //     // Check Validation
  //     if (!isValid) {
  //       // If any errors, send 400 with errors object
  //       return res.status(400).json(errors);
  //     }

  //     Post.findById(req.params.id)
  //       .then(post => {
  //         const newComment = {
  //           text: req.body.text,
  //           name: req.body.name,
  //           avatar: req.body.avatar,
  //           user: req.user.id
  //         };

  //         // Add to comments array
  //         post.comments.unshift(newComment);

  //         // Save
  //         post.save().then(post => res.json(post));
  //       })
  //       .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  //   }
  // );

  // // @route   DELETE api/posts/comment/:id/:comment_id
  // // @desc    Remove comment from post
  // // @access  Private
  // app.delete(
  //   "/comment/:id/:comment_id",
  //   passport.authenticate("jwt", { session: false }),
  //   (req, res) => {
  //     Post.findById(req.params.id)
  //       .then(post => {
  //         // Check to see if comment exists
  //         if (
  //           post.comments.filter(
  //             comment => comment._id.toString() === req.params.comment_id
  //           ).length === 0
  //         ) {
  //           return res
  //             .status(404)
  //             .json({ commentnotexists: "Comment does not exist" });
  //         }

  //         // Get remove index
  //         const removeIndex = post.comments
  //           .map(item => item._id.toString())
  //           .indexOf(req.params.comment_id);

  //         // Splice comment out of array
  //         post.comments.splice(removeIndex, 1);

  //         post.save().then(post => res.json(post));
  //       })
  //       .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  //   }
  // );
};
