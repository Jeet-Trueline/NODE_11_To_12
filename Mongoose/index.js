const express = require("express");

const mongoose = require('mongoose');

const app = express();

app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/Ujas');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});

const userModel = mongoose.model('User', userSchema);

app.post("/userData", async (req, res) => {

    const userData = {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    }

    const data = await userModel.create(userData);
    console.log("---->", data);

    res.send(data)

});

app.get("/getData", async (req, res) => {
    const data = await userModel.find();
    console.log("---->", data);

    res.send(data)
});

app.listen(5000);