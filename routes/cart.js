const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth");

const { list, addItemByID, removeItemByID } = require("../controllers/cart");

router.route("/list").post(protect, list);

router.route("/addItemByID/:itemID").get(protect, addItemByID);

router.route("/removeItemByID/:itemID").post(protect, removeItemByID);

module.exports = router;
