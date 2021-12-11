const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth");

const {
  list,
  additembyid,
  removeitembyid,
  clear,
  checkout,
} = require("../controllers/cart");

router.route("/list").get(protect, list);

router.route("/additembyid/:itemID").get(protect, additembyid);

router.route("/removeitembyid/:itemID").delete(protect, removeitembyid);

router.route("/clear").delete(protect, clear);

router.route("/checkout").get(protect, checkout);

module.exports = router;
