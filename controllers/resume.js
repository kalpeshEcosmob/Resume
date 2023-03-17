const sql = require("../database/database").sql;
const ValidateEmail = require("../utils/functions").ValidateEmail;

//...............................................

exports.getResumeDataTest = async (req, res, next) => {
  try {
    let query;
    const value = +req.params.value;

    if (!Number.isInteger(value)) {
      console.log("Request of data = ", req.params.value);
      query = `SELECT * FROM tbl_cv where emp_email = "${req.params.value}"`;
    } else {
      console.log("Request of data = ", value);
      query = `SELECT * FROM tbl_cv where emp_id = ${value}`;
    }
    sql.query(query, function (err, results) {
      if (!err) {
        if (results.length == 0)
          return res.status(404).json({
            message: "No data available..! Please check your employee id",
          });
        if (!!results[0].resume_data) {
          var jsonData = JSON.parse(results[0].resume_data);
          results[0].resume_data = jsonData.replace(/\\\n/g, "");
        }
        results[0].image =
          "http://172.16.16.147:3000/images/" + results[0].image;

        res.status(200).json({
          data: JSON.parse(results[0].resume_data),
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
  } catch (error) {
    console.log("Error in getting data : ", error);
    res
      .status(400)
      .json({ Error: "Something went wrong ...! Please try again ...!" });
  }
};
//..............................................

exports.postResumeData = async (req, res, next) => {
  try {
    let imageUrl;
    if (!req.file) {
      return res.json({ message: "Please provide image" });
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
        console.log("Data inserted successfully with emp_id = ", emp_id);
        return res.status(200).json({
          status: `emp succesfully inserted`,
        });
      } else {
        console.log("error", err);
        return res.status(400).send({ message: "Invalid id" });
      }
    });
  } catch (error) {
    console.log("error", error);
    return res.sendStatus(400).json({ message: "Something went wrong" });
  }
};

exports.header = (req, res, next) => {
  const id = req.params.id;
  if (!id) return res.sendStatus(400).json({ Message: "Enter Id" });
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
      results[0].image = "http://172.16.16.147:3000/images/" + results[0].image;

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
};

exports.footer = async (req, res, next) => {
  res.render("footer");
};

exports.pdf = async (req, res, next) => {
  const id = req.params.id;
  if (!id) return res.sendStatus(400).json({ Message: "Enter Id" });

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
      results[0].image = "http://172.16.16.147:3000/images/" + results[0].image;

      const data = JSON.parse(results[0].resume_data);
      return res.render("resume", {
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
};

exports.generatePdf = async (req, res, next) => {
  cmd(command);
  return res.json("Pdf generation complete");
};

exports.updateResume = async (req, res, next) => {
  try {
    const { emp_id, emp_email, resume_data } = req.body;
    var imageUrl;
    if (!req.file) {
      const updatedQuery =
        "UPDATE tbl_cv SET emp_email=?,resume_data=? where emp_id=?";
      sql.query(
        updatedQuery,
        [emp_email, JSON.stringify(resume_data), emp_id],
        (err, row) => {
          if (!err) {
            console.log(`Updated successfully at emp_id = `, emp_id);
            res.status(200).json({ status: `Resume updated successfully` });
            console.log(row);
          } else {
            res.status(400).send(err.message);
          }
        }
      );
    } else {
      imageUrl = req.file.filename;
      const updatedQuery =
        "UPDATE tbl_cv SET emp_email=?,image=?,resume_data=? where emp_id=?";

      sql.query(
        updatedQuery,
        [emp_email, imageUrl, JSON.stringify(resume_data), emp_id],
        (err, row) => {
          if (!err) {
            console.log(`Updated successfully at emp_id = `, emp_id);
            res.status(200).json({ status: `Resume updated successfully` });
            console.log(row);
          } else {
            res.status(400).send(err.message);
          }
        }
      );
    }
  } catch (error) {
    console.log("Error in updating query", error);
  }
};

exports.isValidEmail = async (req, res, next) => {
  const isPresentEmail = req.params.email;
  const query = `SELECT * FROM tbl_cv`;
  sql.query(query, function (err, results) {
    if (!err) {
      if (results.length == 0)
        return res.status(404).json({
          message: "No data available..!",
        });
      const emails = results.map((e) => e.emp_email);
      const isPresent = emails.includes(isPresentEmail);
      res.status(200).json({
        valid: isPresent,
      });
    } else {
      console.log("Error in requesting data", err);
      res.status(400).json({
        message: "Something went wrong ..! Table not found..!",
      });
    }
  });
};
