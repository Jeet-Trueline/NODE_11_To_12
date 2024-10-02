const user = require("../models/userSchema.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const privateKey = "#J$e$e$T&BhUvA"


const userCreate = async (req, res) => {

    const { name, email, password, mobile_no } = req.body

    const bpass = await bcrypt.hash(password, 12)
    // console.log("---->", bpass);

    const userData = {
        name: name,
        email: email,
        password: bpass,
        mobile_no: mobile_no
    }

    const data = await user.create(userData);
    // console.log("---->", data);

    res.send(data)

}

const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body

        console.log("!!!!", req.body.password);


        const userLogin = await user.findOne({ email: email })

        console.log("111111", userLogin);


        if (!userLogin) {
            res.status(401).send({ message: "Email is not valid..." });
        }

        const userPassword = await bcrypt.compare(password, userLogin.password)
        console.log("22222", userPassword);


        if (userPassword) {

            const token = jwt.sign({ email: userLogin.email, password: userLogin.password }, privateKey, { expiresIn: '1h' })

            res.status(200).send({ message: "User Login .. ", data: userLogin, token: token });

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