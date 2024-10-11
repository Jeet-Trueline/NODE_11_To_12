const user = require("../models/userSchema.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const privateKey = "#J$e$e$T&BhUvA"


const userCreate = async (req, res) => {

    const { name, email, password, mobile_no } = req.body

    if (!/^[a-zA-Z]+$/.test(name)) {
        return res
            .status(401)
            .send({ message: "Name must contain only letters" });
    }

    // Validation for email: Simple format validation
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(401).send({ message: "Invalid email format" });
    }

    // Validation for password: At least 6 characters
    if (password.length < 6) {
        return res
            .status(401)
            .send({ message: "Password must be at least 6 characters long" });
    }

    // Validation for mobile: Only numeric characters allowed and must be 10 digits long
    if (!/^\d{10}$/.test(mobile_no)) {
        return res.status(401).send({
            message: "Mobile number must contain exactly 10 numeric digits",
        });
    }

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


const sendEmail = async (req, res) => {

    const otp = Math.floor(100000 + Math.random() * 900000);

    const transporter = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'bhuvajeet99@gmail.com',
            pass: 'ddxp tuwl vorn bgio'
        }
    });

    const mailOptions = {
        from: 'bhuvajeet99@gmail.com',
        to: 'ujasbaravaliya4411@gmail.com',
        subject: 'Sending Email using Node.js',
        text: String(otp),
        html: `<h1>Welcome</h1><p>${otp}</p>`
    };

    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}


module.exports = {
    userCreate,
    userGet,
    loginUser,
    sendEmail
}