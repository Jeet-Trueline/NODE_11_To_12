const http = require("http");
// const url = require("url")
// const queryString = require("querystring")
const { add, sub } = require("./calcu")

http.createServer(function (req, res) {
    // console.log(req.url);
    const reqURL = req.url

    console.log("------->", reqURL);


    const num1 = 3;
    const num2 = 5;

    if (reqURL == '/add') {
        res.write(add(num1, num2))
    } else if (reqURL == '/sub') {
        res.write(sub(num1, num2));
    }
    // res.write(reqURL);
    res.end();
}).listen(8000);