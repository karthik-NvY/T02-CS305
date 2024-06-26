/*
	File contains routes dealing with api services.
*/
const express = require('express');
const router = new express.Router();

const Ngohandler  = require("../controllers/NgoController");
const tokenMiddle = require("../middleware/tokenMiddle");
const taskAutomationController = require("../controllers/taskAutomationController");
const waitlisthandler = require('../controllers/ExecSignupController');
router.post("/ngoTask", tokenMiddle, Ngohandler.FetchNgoTasks); // Route /api/ngotask
router.post("/ngoInfo", tokenMiddle, Ngohandler.fetchNgoInfo); //Route /user/ngoinfopage
router.post("/taskauto", tokenMiddle, taskAutomationController); 
router.post("/rolesignup", tokenMiddle, Ngohandler.roleSignup)

router.post("/fetch", tokenMiddle, waitlisthandler.fetchRequests); //Route  /api/fetch
router.post("/add", tokenMiddle, waitlisthandler.storeRequest);    //Route  /api/add
router.post("/delete", tokenMiddle, waitlisthandler.deleteRequest); //Route /api/delete
router.post("/updateRole", tokenMiddle, waitlisthandler.updateRole);//Route /api/updaterole

module.exports = router;