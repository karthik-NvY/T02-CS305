/*
	File contains routes dealing with api services.
*/
const express = require('express');
const router = new express.Router();

const Ngohandler  = require("../controllers/NgoController");

router.post("/ngoInfo", Ngohandler.fetchNgoInfo); //Route /user/ngoinfopage

module.exports = router