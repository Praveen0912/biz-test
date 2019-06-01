const express = require("express");
const router = express.Router();
const UserController = require('../controllers/user');

router.get("/", UserController.get_users_all);

router.get("/user-search/:long/:lat", UserController.get_user_by_cordinates);

router.post("/create-user", UserController.create_user_by_file_data);

module.exports = router;
