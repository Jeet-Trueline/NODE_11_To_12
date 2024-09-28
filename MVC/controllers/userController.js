const user = require("../models/userSchema.js");

const userCreate = async (req, res) => {

    const { name, email, password, mobile_no } = req.body

    const userData = {
        name: name,
        email: email,
        password: password,
        mobile_no: mobile_no
    }

    const data = await user.create(userData);
    // console.log("---->", data);

    res.send(data)

}

const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body

        const userLogin = await user.findOne({ email: email })

        if (password === userLogin.password) {
            res.status(200).send({ message: "Login User ", data: userLogin });
        } else {
            res.send("User Password Wrong !!")
        }
    } catch (error) {
        res.send(error);
    }
}

const userGet = async (req, res) => {
    const data = await user.find();

    console.log(data);

    res.send(data);

}

module.exports = {
    userCreate,
    userGet,
    loginUser
}