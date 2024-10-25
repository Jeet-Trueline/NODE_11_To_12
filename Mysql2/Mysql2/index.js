const express = require('express')
const bodyParser = require('body-parser')

// const ejs = require('ejs');

const connection = require('./database/db')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs');

// parse application/json
app.use(bodyParser.json())

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/register.html")
})

app.post('/', (req, res) => {

  const { name, email, password } = req.body

  connection.connect(function (error) {
    if (error) throw error


    // sql = "INSERT INTO user ( name, email, password  ) values ('" + name + "','" + email + "','" + password + "' ) "

    // connection.query(sql, function (error) {
    //   if (error) throw error
    //   res.send(" Register User....")
    // })


    // sql = "INSERT INTO user ( name, email, password  ) values ( ? , ? , ? ) "

    // connection.query(sql, [name, email, password], function (error) {
    //   if (error) throw error
    //   res.send(" Register User....")
    // })

    const sql = "INSERT INTO user (name, email, password) VALUES ?";

    const users = [[name, email, password]]

    connection.query(sql, [users], function (error) {
      if (error) throw error;
      res.redirect('/student');
      // res.send("Users Registered Successfully");
    });

  });


})

app.get("/student", (req, res) => {

  connection.connect(function (error) {
    if (error) throw error

    const sql = "select * from user";

    connection.query(sql, function (error, result) {
      if (error) throw error;
      res.render(__dirname + "/students.ejs", { students: result })
    })
  })
})

app.listen(7000);
