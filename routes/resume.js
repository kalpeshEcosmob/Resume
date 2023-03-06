const express = require("express");
const CORS = require("cors");
const resumeController = require("../controllers/resume");
const router = express.Router();

router.get("/getData/:id", CORS(), resumeController.getData);

router.post("/postData", CORS(), resumeController.postData);

router.get("/header/:id", CORS(), resumeController.header);

router.get("/footer", CORS(), resumeController.footer);

router.get("/forpdf/:id", resumeController.pdf);

router.get("/generate", resumeController.generatePdf);

module.exports = router;
