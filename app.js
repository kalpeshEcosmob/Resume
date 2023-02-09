const express = require("express");
const bodyParser = require("body-parser");
const CORS = require("cors");
const mysql2 = require("mysql2");
const multer = require("multer");
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
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

const sql = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "Admin@123",
  database: "Resume_",
});

const app = express();
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use(express.static("uploads"));
app.use("/uploads", express.static("uploads"));
app.use(CORS());
app.options("*", CORS());
// app.use(forms.array());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 3000;
app.set("trust proxy", true);
app.all("/*", (req, res, next) => {
  // req.headers["x-forwarded-for","172.16.18.51"];

  res.setHeader(
    "Access-Control-Allow-Origin",
    "http://localhost:3000 http://172.16.18.51:3000"
  );

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  // res.setHeader("Access-Control-Allow-Headers", "*");
  // res.setHeader("Access-Control-Allow-Credentials", true);

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)

  // res.setHeader("Access-Control-Expose-Headers","*://localhost:*/*")
  // req.headers["172.16.18.51"];
  next();
});

app.get("/getData/:id", CORS(), async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!!id) {
      const query = `SELECT * FROM tbl_cv where emp_id = ${id}`;

      sql.query(query, function (err, results) {
        if (!err) {
          if (results.length == 0)
            return res.json({
              message: "No data available..! Please check your employee id",
            });
          if (!!results[0].resume_data) {
            let jsonData = JSON.parse(results[0].resume_data);
            results[0].resume_data = jsonData.replace(/\\\n/g, "");
          }
          results[0].image = "http://172.16.16.147:3000/" + results[0].image;
          res
            .status(200)
            .json({ data: results[0].resume_data, image: results[0].image });
        } else {
          console.log("Error in requesting data", err);
          res.status(400).json({
            message:
              "Something went wrong ..! Please check your employee id and try again ....!",
          });
        }
      });
    } else {
      console.log("No Record Found", err);
      res.status(400).json({ message: "No Record Found" });
    }
  } catch (error) {
    console.log("Error in getting data ====>", error);
    res
      .status(400)
      .json({ Error: "Something went wrong ...! Please try again ...!" });
  }
});

app.post("/postData", CORS(), async (req, res, next) => {
  try {
    req.headers["172.16.18.51"];
    let imageUrl;
    if (!req.file) {
      res.json({ message: "Please enter a image" });
    } else {
      imageUrl = req.file.filename;
    }
    const { emp_id, emp_email, resume_data } = req.body;

    const is_valid = ValidateEmail(emp_email);
    if (!is_valid)
      return res.status(400).json({ Error: "Please enter a valid email" });
    const data = JSON.stringify(resume_data);
    const query =
      "INSERT INTO tbl_cv(emp_id,emp_email,image,resume_data) VALUES ?";
    const value = [[emp_id, emp_email, imageUrl, data]];

    sql.query(query, [value], function (err, results) {
      if (!err) {
        res.status(200).json({
          status: `emp succesfully inserted`,
          data: results,
        });
        console.log(results);
      } else {
        console.log("error", err);
        res.status(400).send({ message: "Invalid id" });
      }
    });
  } catch (error) {
    console.log("error", error);
    res.sendStatus(400).json({ message: "Something went wrong" });
  }
});

app.use((error, req, res, next) => {
  console.log("Error", error);
  res
    .status(500)
    .json({ Error: "Invalid Request", message: "Please check your url" });
});

app.listen(PORT, () => {
  console.log(`Running at port ${PORT}`);
});

function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  alert("You have entered an invalid email address!");
  return false;
}
