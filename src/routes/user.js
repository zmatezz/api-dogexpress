const express = require("express");
const router = express.Router();
const userController = require("../controllers/users"); // Corrigido para categories

router.post("/", userController.createUser);

module.exports = router;
