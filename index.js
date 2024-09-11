const http = require("http");
const { add } = require("./calcu")

http.createServer(function (req, res) {
    const result = add(1, 5);
    res.write(result);
    res.end();
}).listen(8000);