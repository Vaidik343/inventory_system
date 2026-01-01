const express = require("express");
const router = express.Router();

const { permissionController } = require("../controllers/permission");
const auth = require("../middlewares/auth");
const permit = require("../middlewares/permit");
const {apiLimiter} = require('../middlewares/rateLimiter');
const{permissionValidation} = require('../validators/permissionValidation')
const validate = require("../middlewares/validate")

router.post(
  "/permission",
  auth,
  apiLimiter,
  permissionValidation.createPermissionValidation,
  validate,
  // permit("permission", "create"),
  permissionController.createPermission
);

router.put(
  "/permission/:id",
  auth,
  apiLimiter,
  permissionValidation.updatePermissionValidation,
  validate,
  // permit("permission", "update"),
  permissionController.updatePermission
);

module.exports = router;
