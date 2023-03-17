const express = require("express");
const CORS = require("cors");
const resumeController = require("../controllers/resume");
const router = express.Router();

router.get("/resumeData/:value", resumeController.getResumeDataTest);

router.post("/resumeData", resumeController.postResumeData);

router.put("/update", resumeController.updateResume);

router.get("/isValidEmail/:email", resumeController.isValidEmail);


//.............to create pdf..................//

router.get("/header/:id", resumeController.header);

router.get("/footer", resumeController.footer);

router.get("/forpdf/:id", resumeController.pdf);

router.get("/generate", resumeController.generatePdf);

//..............................................//

module.exports = router;
