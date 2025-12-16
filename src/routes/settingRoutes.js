const {settingController} = require("../controllers/setting");
const express = require("express");
const router = express.Router();

router.post("/setting" , settingController.createSetting);
router.get("/setting", settingController.getSetting);
router.put("/setting/:id", settingController.updateSetting);


module.exports = router;