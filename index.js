const http = require("http");
const url = require("url")
const queryString = require("querystring")
const { add, sub } = require("./calcu")

http.createServer(function (req, res) {
    // console.log(req.url);
    const reqURL = req.url
    // const result = add(1, 5);

    const parseURL = url.parse(reqURL)
    // console.log(parseURL.query);

    const queryStringURL = queryString.parse(parseURL.query);

    console.log(queryStringURL);

    const num1 = queryStringURL.num1;
    const num2 = queryStringURL.num2;

    if (reqURL.includes('/add')) {
        res.write(add(num1, num2))
    } else if (reqURL.includes('/sub')) {
        res.write(sub(num1, num2));
    }
    // res.write(reqURL);
    res.end();
}).listen(8000);