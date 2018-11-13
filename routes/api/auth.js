const express = require("express");
const router = express.Router();

// Route: /api/auth/test
// Access: Public
// Description: Tests auth route
router.get("/test", (req, res) => res.json({ msg: "Auth working!" }));

module.exports = router;
