const user = require("../models/userSchema.js");

const userCreate = async (req, res) => {

    const userData = {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    }

    const data = await user.create(userData);
    console.log("---->", data);

    res.send(data)

}

const userGet = async (req, res) => {
    const data = await user.find();

    console.log(data);

    res.send(data);

}

module.exports = {
    userCreate,
    userGet
}