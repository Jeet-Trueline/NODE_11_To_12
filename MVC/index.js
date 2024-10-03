const express = require("express");
const app = express();

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }));



// parse application/json
app.use(bodyParser.json());

// app.use(express.json());
const { db } = require("./database/db")
const { userCreate, userGet, loginUser } = require("./controllers/userController");
const { categoryCreate } = require("./controllers/categoryController");


const { verifyToken } = require("./Middleware/userAuth")

// User API 
app.post("/userData", userCreate);
app.post("/userLogin", loginUser);
app.get("/userGet", verifyToken, userGet);

// category API
app.post("/categoryData", verifyToken, categoryCreate);

// app.get("/getData", async (req, res) => {
//     const data = await userModel.find();
//     console.log("---->", data);

//     res.send(data)
// });

// app.put("/updateData/:id", async (req, res) => {
//     const data = await userModel.updateOne({ _id: req.params.id }, {
//         name: req.body.name,
//         email: req.body.email,
//         age: req.body.age
//     });

//     console.log(data);

//     res.send(data)
// })

// app.delete("/deleteData/:id", async (req, res) => {

//     const data = await userModel.deleteOne({ _id: req.params.id })

//     console.log(data);

//     res.send(data)

// })

app.listen(5000);