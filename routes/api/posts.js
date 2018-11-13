const express = require("express");
const router = express.Router();

// Route: /api/posts/test
// Access: Public
// Description: Tests posts route
router.get("/test", (req, res) => res.json({ msg: "Posts working!" }));

module.exports = router;
