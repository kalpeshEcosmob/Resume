const express = require("express");
const bodyParser = require("body-parser");
const CORS = require("cors");
const mysql2 = require("mysql2");
const multer = require("multer");
const { exec } = require("child_process");

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
app.use(CORS());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use(express.static("uploads"));
app.use("/uploads", express.static("uploads"));
app.options("*", CORS());
// app.use(forms.array());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

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
const PDFDocument = require("pdfkit");
const fs = require("fs");

app.get("/", (req, res, next) => {
  console.log("hello");
  res.render('resume')
  // let pdfDoc = new PDFDocument();
  // // pdfDoc.pipe(fs.createWriteStream("./uploads/SampleDocument.pdf"));
  // pdfDoc.pipe(res);
  // res.setHeader("Content-Type", "application/pdf");
  // pdfDoc.text("My Sample PDF Document");

  // pdfDoc.text("This is a footer", 20, pdfDoc.page.height - 50, {
  //   lineBreak: false,
  // });
  // pdfDoc.end();
});

app.get("/forpdf/:id", (req, res, next) => {
  const id = req.params.id;
  if (!id) return res.sendStatus(400).json({ Message: "Enter Id" });

  // const query = `SELECT * FROM tbl_cv where emp_id = ${id}`;
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

      const data = JSON.parse(results[0].resume_data);

      res.render("testcopy", {
        data: data,
        image: results[0].image,
      });
    } else {
      console.log("Error in requesting data", err);
      res.status(400).json({
        message:
          "Something went wrong ..! Please check your employee id and try again ....!",
      });
    }
  });
});


app.get("/header/:id", (req, res, next) => {
  const id = req.params.id;
  if (!id) return res.sendStatus(400).json({ Message: "Enter Id" });

  // const query = `SELECT * FROM tbl_cv where emp_id = ${id}`;
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

      const data = JSON.parse(results[0].resume_data);

      res.render("header", {
        data: data,
      });
    } else {
      console.log("Error in requesting data", err);
      res.status(400).json({
        message:
          "Something went wrong ..! Please check your employee id and try again ....!",
      });
    }
  });
});
app.get("/footer", (req, res, next) => {
  res.render("footer");
});


var pdf = require("html-pdf");
app.get("/newww", (req, res, next) => {
  console.log('neww')
  let options = { format: "A4" };
  // Example of options with args //
  // let options = { format: 'A4', args: ['--no-sandbox', '--disable-setuid-sandbox'] };

  let file = { content: "<h1>Welcome to html-pdf-node</h1>" };
  // or //
  // let file = { url: "https://example.com" };
  html_to_pdf.generatePdf(file, options).then((pdfBuffer) => {
    console.log("PDF Buffer:-", pdfBuffer);
  });
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
      res.json({ message: "Please provide image" });
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
function cmd(cmd) {
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}
// cmd("wkhtmltopdf http://172.16.16.147:3000/getData/681 '/home/kalpesh/Desktop/mySql_pro/te.pdf'")
// cmd("wkhtmltopdf http://172.16.16.147:3000/forpdf '/home/kalpesh/Desktop/mySql_pro/te.pdf'")
// cmd(
//   "wkhtmltopdf http://172.16.16.147:3000/forpdf/681 '/home/kalpesh/Desktop/mySql_pro/test1.pdf'"
// );



