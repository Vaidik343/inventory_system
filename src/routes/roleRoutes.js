const {rolesController} = require("../controllers/roles");
const express = require("express");
const router = express.Router();
const {apiLimiter} = require('../middlewares/rateLimiter');

const {createRoleValidation,
  updateRoleValidation,
  deleteRoleValidation} = require("../validators/rolesValidation")
const validate = require("../middlewares/validate")

router.post("/roles",apiLimiter,createRoleValidation, validate,rolesController.createRole);
router.get("/roles", apiLimiter, rolesController.getRoles);
router.put("/roles/:id", apiLimiter,updateRoleValidation, validate, rolesController.updateRoles);
router.delete("/roles/:id", apiLimiter, deleteRoleValidation, validate,rolesController.deleteRoles);

module.exports = router;
