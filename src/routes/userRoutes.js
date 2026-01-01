const express = require("express");
const router = express.Router();

const { userController
} = require("../controllers/user");

const auth = require("../middlewares/auth");
const permit = require("../middlewares/permit");

const {apiLimiter} = require('../middlewares/rateLimiter');

const {userValidation} = require("../validators/userValidation")
const validate = require("../middlewares/validate")

router.post("/user",apiLimiter, userValidation.createUserValidation, validate,userController.createUser);

router.get("/user", apiLimiter, userController.getUser);

router.put("/user/:id", apiLimiter, userValidation.updateUserValidation,validate, userController.updateUser);

router.patch("/user/:id" , apiLimiter, userValidation.deleteUserValidation,validate, userController.deleteUser)

router.post('/user/:id/permission/grant', auth, apiLimiter, userController.grantPermission);

router.post('/user/:id/permission/revoke', auth,apiLimiter,  userController.revokePermission)

router.get("/me/permissions", auth, apiLimiter, userController.getMyPermission);

module.exports = router;
