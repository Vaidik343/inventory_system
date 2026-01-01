const {settingController} = require("../controllers/setting");
const express = require("express");
const router = express.Router();
const {apiLimiter} = require('../middlewares/rateLimiter');


router.post("/setting" , apiLimiter,settingController.createSetting);
router.get("/setting",apiLimiter, settingController.getSetting);
router.put("/setting/:id",apiLimiter, settingController.updateSetting);


module.exports = router;