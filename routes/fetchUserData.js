const express = require("express");
const router = express.Router();
const { fetchUserData } = require("../controllers/fetchUserData");
const { protect } = require("../middleware/auth");

router.route("/homepage").get(protect, fetchUserData);

module.exports = router;
