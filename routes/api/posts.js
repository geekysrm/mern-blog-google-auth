const Post = require("../../models/Post");
const User = require("../../models/User");
var send = [];

module.exports = app => {
  app.get("/posts/test", (req, res) => res.json({ msg: "Posts Works" }));

  // @route   GET api/posts
  // @desc    Get posts
  // @access  Public

  app.get("/posts", (req, res) => {
    // send = [];
    Post.find()
      .sort({ date: -1 })
      .then(posts => {
        posts.map(item => {
          User.findOne({ _id: item.user }, (err, user) => {
            send.push({ user: user, post: item });
            console.log(send);
          });
        });
        console.log(send);
        res.json(send);
      })
      .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
  });

  // @route   POST api/posts
  // @desc    Create post
  // @access  Private
  app.post("/posts/create/", (req, res) => {
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      // avatar: req.body.avatar,
      user: req.user.id,
      title: req.body.title,
      photo: req.body.photo
    });
    console.log(req.body.text);
    newPost.save().then(post => res.json(post));
  });
};
