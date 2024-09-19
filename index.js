// const http = require("http");
// const url = require("url")
// const queryString = require("querystring")
// const { add, sub } = require("./calcu")

// http.createServer(function (req, res) {
//     // console.log(req.url);
//     const reqURL = req.url
//     // const result = add(1, 5);

//     const parseURL = url.parse(reqURL)
//     // console.log(parseURL.query);

//     const queryStringURL = queryString.parse(parseURL.query);

//     console.log(queryStringURL);

//     const num1 = queryStringURL.num1;
//     const num2 = queryStringURL.num2;

//     if (reqURL.includes('/add')) {
//         res.write(add(num1, num2))
//     } else if (reqURL.includes('/sub')) {
//         res.write(sub(num1, num2));
//     }
//     // res.write(reqURL);
//     res.end();
// }).listen(8000);

const express = require("express");
const { MongoClient } = require('mongodb');
// const { add, sub } = require("./calcu")
const app = express();

const url = 'mongodb://localhost:27017';

const client = new MongoClient(url);

async function main() {
    // Use connect method to connect to the server
    await client.connect();
    // console.log('Connected successfully to server');
    const db = client.db("demo");
    const collection = db.collection("tests");

    const data = await collection.find({}).toArray();

    // console.log(data);

    return data;
}

async function insertData() {
    await client.connect();
    // console.log('Connected successfully to server');
    const db = client.db("demo");
    const collection = db.collection("tests");
    const data = await collection.insertOne({ "name": "Harshil1", "age": 10, "email": "harshilvelenja123@gmail.com", "password": "Harshi@123" })

    return data
}


app.post("/insertData", async (req, res) => {

    const insertDatas = await insertData();

    res.send(insertDatas);
})

app.get("/getData", async (req, res) => {

    const data = await main();
    console.log(data);

    res.send(data)
})


// app.get('/', (req, res) => {
//     res.send("Hello......")
// });

// app.get('/add', (req, res) => {
//     res.send(add(req.query.num1, req.query.num2))
// });

// app.get('/sub/:num1/:num2', (req, res) => {
//     res.send(sub(req.params.num1, req.params.num2))
// });

app.listen(8000);

