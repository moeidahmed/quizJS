const express = require("express");
const path = require("path");
const mysql = require("mysql");
const app = express();
const cors = require("cors");

const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "quiz",
});
const a = (err) => {
  if (!err) console.log("DB connection succeeded.");
  else
    console.log(
      "DB connection is failed \n Error : " + JSON.stringify(err, undefined, 2)
    );
};
mysqlConnection.connect(a);
app.use(express.json());
app.use(
  cors({
    methods: ["GET", "POST", "DELETE"],
  })
);

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/login.html"));
});
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/admin.html"));
});
app.get("/quiz", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/quiz.html"));
});
app.get("/result", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/result.html"));
});

//POST METHODS
//1) CREATE QUIZ
function createQuiz(req, res) {
  console.log(req.body);
  const data = req.body;
  mysqlConnection.query(
    `INSERT INTO createquiz (question,option1,option2,option3,option4,correct) VALUES ("${data.question}","${data.option1}","${data.option2}","${data.option3}","${data.option4}","${data.correct}")`,
    (err, rows, fields) => {
      if (!err) {
        console.log("succeed");
        res.send(rows);
      } else console.log(err, "errerrrrrrrrrr");
    }
  );
}
app.post("/create/quiz", createQuiz);

//2)RESULT
function result(req, res) {
  console.log(req.body);
  const data = req.body;
  mysqlConnection.query(
    `INSERT INTO userinfo (userSelectedOption,correctOption,id) VALUES ("${data.userSelectedOption}","${data.correctOption}","${data.id}")`,
    (err, rows, fields) => {
      if (!err) {
        console.log("succeed");
        res.send(rows);
      } else console.log(err, "errerrrrrrrrrr");
    }
  );
}
app.post("/post/result", result);

//GET METHODS
//GET QUIZ DATA
app.get("/quiz/data", (req, res) => {
  mysqlConnection.query("SELECT * FROM createquiz", (err, rows) => {
    if (!err) {
      console.log("Success");
      res.send(rows);
    } else console.log(err);
  });
});
//GET RESULT
app.get("/get/result", (req, res) => {
  mysqlConnection.query("SELECT * FROM userinfo", (err, rows) => {
    if (!err) {
      console.log("Success");
      res.send(rows);
    } else console.log(err);
  });
});
//DELETE USER DATA
app.delete("/delete/data", (req, res) => {
  mysqlConnection.query(
    `DELETE  FROM userinfo WHERE id = 1`,
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
        console.log("succeed");
      } else console.log(err);
    }
  );
});

app.listen(5000, () => {
  console.log("Server is up on port 5000");
});
