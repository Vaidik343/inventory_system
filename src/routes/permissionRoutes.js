const express = require("express");
const router = express.Router();

const { permissionController } = require("../controllers/permission");
const auth = require("../middlewares/auth");
const permit = require("../middlewares/permit");

router.post(
  "/permission",
  auth,
  // permit("permission", "create"),
  permissionController.createPermission
);

router.put(
  "/permission/:id",
  auth,
  // permit("permission", "update"),
  permissionController.updatePermission
);

module.exports = router;
