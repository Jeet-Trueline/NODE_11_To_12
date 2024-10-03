
const jwt = require('jsonwebtoken');

const privateKey = "#J$e$e$T&BhUvA"

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        await jwt.verify(token, privateKey, (err) => {
            if (err) {
                res.send("User unauthorization")
            } else {
                next();
            }
        });

    } catch (error) {
        res.send(error);
    }
}

module.exports = { verifyToken }