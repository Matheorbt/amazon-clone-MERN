const express = require("express");
const router = express.Router();
const { fetchUserData } = require("../controllers/fetchUserData");
const { protect } = require("../middleware/auth");

router.route("/homepage").post(protect, fetchUserData);

module.exports = router;
