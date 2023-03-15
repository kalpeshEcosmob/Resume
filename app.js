const express = require("express");
const bodyParser = require("body-parser");
const CORS = require("cors");
const multer = require("multer");
const resumeRoutes = require("./routes/resume");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const app = express();
app.use(CORS());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use(express.static("uploads"));
app.options("*", CORS());

app.use("/uploads", express.static("uploads"));
app.set("view engine", "ejs");
app.set("views", "views");

const PORT = 3000;
app.set("trust proxy", true);
app.all("/*", (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "http://localhost:3000 http://172.16.18.51:3000"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  next();
});

app.use(CORS(), resumeRoutes);

app.use((error, req, res, next) => {
  console.log("Error", error);
  res
    .status(500)
    .json({ Error: "Invalid Request", message: "Please check your url" });
});

app.listen(PORT, () => {
  console.log(`Running at port ${PORT}`);
});

// wkhtmltopdf --header-html http://172.16.16.147:3000/header/422  --footer-html http://172.16.16.147:3000/footer --header-spacing 10 --margin-top 53 --margin-left 0 --margin-right 0 --no-pdf-compression --page-size A4 --margin-bottom 25  http://172.16.16.147:3000/forpdf/422 '/home/kalpesh/Desktop/ResumeMaking/pdf/422.pdf'
