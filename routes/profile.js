const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth");
const { info, update } = require("../controllers/profile");

router.route("/info").get(protect, info);

router.route("/update").put(protect, update);

module.exports = router;
