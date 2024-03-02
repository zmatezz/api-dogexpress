const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");
const { authorize } = require("../middleware/auth");

router.post("/create", authorize, userController.createUser);
router.post("/login", userController.login);

module.exports = router;
