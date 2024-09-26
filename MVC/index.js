const express = require("express");

const mongoose = require('mongoose');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/Ujas');

const { userCreate, userGet } = require("./controllers/userController");


// User API 
app.post("/userData", userCreate);
app.get("/userGet", userGet);



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