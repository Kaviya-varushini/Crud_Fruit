const express = require("express");
const { getFruits, addFruit, deleteFruit } = require("../controllers/fruitController");

const router = express.Router();

router.route("/").get(getFruits).post(addFruit);
router.route("/:id").delete(deleteFruit);

module.exports = router;