const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth");

const {
  list,
  additembyid,
  removeitembyid,
  clear,
} = require("../controllers/cart");

router.route("/list").post(protect, list);

router.route("/additembyid/:itemID").get(protect, additembyid);

router.route("/removeitembyid/:itemID").post(protect, removeitembyid);

router.route("/clear").delete(protect, clear);

module.exports = router;
