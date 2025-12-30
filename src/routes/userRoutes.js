const express = require("express");
const router = express.Router();

const { userController
} = require("../controllers/user");

const auth = require("../middlewares/auth");
const permit = require("../middlewares/permit");

router.post("/user", userController.createUser);

router.get("/user", userController.getUser);

router.put("/user/:id", userController.updateUser);

router.patch("/user/:id" , userController.deleteUser)

router.post('/user/:id/permission/grant', auth,  userController.grantPermission);

router.post('/user/:id/permission/revoke', auth,  userController.revokePermission)

router.get("/me/permissions", auth, userController.getMyPermission);

module.exports = router;
