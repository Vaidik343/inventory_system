const {rolesController} = require("../controllers/roles");
const express = require("express");
const router = express.Router();

router.post("/roles", rolesController.createRole);
router.get("/roles", rolesController.getRoles);
router.put("/roles/:id", rolesController.updateRoles);
router.delete("/roles/:id", rolesController.deleteRoles);

module.exports = router;
