const express = require("express");
const router = express.Router();
const { saveAgridata } = require("../controllers/agridatacontroller");
const { savecontact } = require("../controllers/contactcontroller");
const { saveuser } = require("../controllers/usercontroller");

router.post("/contactinfo", savecontact);
router.post("/user", saveuser);
router.post("/agri", saveAgridata); 

module.exports = router;
