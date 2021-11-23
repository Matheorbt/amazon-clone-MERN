const express = require("express");
const router = express.Router();

const { list, addItemByID, removeItemByID } = require("../controllers/cart");

router.route("/list").post(list);

router.route("/addItemByID").post(addItemByID);

router.route("/removeItemByID").post(removeItemByID);
module.exports = router;
