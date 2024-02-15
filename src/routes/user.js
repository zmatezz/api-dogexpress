const express = require("express");
const router = express.Router();
const userController = require("../controllers/users"); // Corrigido para categories
const { authorize } = require("../middleware/auth");

router.post("/", authorize, userController.createUser);

module.exports = router;
