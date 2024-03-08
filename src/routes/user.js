const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");
const { authorize } = require("../middleware/auth");

router.get("/", userController.getUsers);

router.post("/create", authorize, userController.createUser);
router.post("/login", userController.login);

router.delete("/:userId", authorize, userController.deleteUser);

module.exports = router;
