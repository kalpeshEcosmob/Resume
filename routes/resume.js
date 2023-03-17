const express = require("express");
const resumeController = require("../controllers/resume");
const router = express.Router();

router.get("/resumeData", resumeController.getResumeData);

router.get("/resumeDataOld/:value", resumeController.getResumeDataOldMethed);

router.post("/resumeData", resumeController.postResumeData);

router.put("/resumeData", resumeController.updateResumeData);

router.get("/isValidEmail", resumeController.isValidEmail);

//.............to create pdf..................//
//.. creating resume pdf from backend so i have commented this routes../

// router.get("/header/:id", resumeController.header);

// router.get("/footer", resumeController.footer);

// router.get("/forpdf/:id", resumeController.pdf);

// router.get("/generate", resumeController.generatePdf);

//..............................................//

module.exports = router;
