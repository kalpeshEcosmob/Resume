const express = require("express");
const CORS = require("cors");
const resumeController = require("../controllers/resume");
const router = express.Router();

router.get("/getData/:id", CORS(), resumeController.getResumeData);

router.post("/postData", CORS(), resumeController.postResumeData);

router.get("/header/:id", CORS(), resumeController.header);

router.get("/footer", CORS(), resumeController.footer);

router.get("/forpdf/:id", CORS(), resumeController.pdf);

router.get("/generate", CORS(), resumeController.generatePdf);

router.put("/update", CORS(), resumeController.updateResume);

module.exports = router;
