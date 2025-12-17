const express = require("express");
const router = express.Router();

const { userController
} = require("../controllers/user");


router.post("/user", userController.createUser);


router.get("/user", userController.getUser);

router.put("/user/:id", userController.updateUser);

router.patch("/user/:id" , userController.deleteUser)

module.exports = router;
