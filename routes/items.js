const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth");
const {
  list,
  remove,
  add,
  update,
  fetchitembyid,
  addcomment,
} = require("../controllers/items");

router.route("/list").get(protect, list);

router.route("/fetchitembyid/:itemID").get(protect, fetchitembyid);

router.route("/remove").delete(protect, remove);

router.route("/add").post(protect, add);

router.route("/update").post(protect, update);

router.route("/addcomment/:itemID").get(protect, addcomment);

module.exports = router;
