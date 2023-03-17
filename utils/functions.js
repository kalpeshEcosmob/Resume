const sql = require("../database/database").sql;

// const database = async (query) => {
//   sql.query(query, (err, result) => {
//     if (!err) {
//       console.log(result);
//       return result;
//     } else {
//       console.log("err", err);
//     }
//   });
// };

// async function database(query) {
//   console.log(query);
//   const obj = { name: "Shyam" };
//   return obj;
// }

function database(query) {
  let data;
  sql.query(query, (err, result) => {
    if (!err) {
      console.log("-------------------->", result);
      return "data";
    } else {
      console.log("err", err);
    }
  });
  return data;
}

const ValidateEmail = (mail) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  alert("You have entered an invalid email address!");
  return false;
};

const cmd = (cmd) => {
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
};

module.exports = { cmd, ValidateEmail, database };
