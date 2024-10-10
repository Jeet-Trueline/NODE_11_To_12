const express = require("express");
const app = express();

const bodyParser = require('body-parser')
const multer = require('multer')
const path = require('path')

app.use(express.static("./public"));

app.use(bodyParser.urlencoded({ extended: false }));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Remove callback inside path.join
        cb(null, path.join(__dirname, "./public/images"), function (err) {
            if (err) {
                throw err
            }
        });
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name, function (err) {
            if (err) {
                throw err
            }
        }); // No need for callback in cb function
    }
})

const upload = multer({ storage: storage })


// parse application/json
app.use(bodyParser.json());

// app.use(express.json());
const { db } = require("./database/db")
const { userCreate, userGet, loginUser } = require("./controllers/userController");
const { categoryCreate } = require("./controllers/categoryController");
const { createProduct, searchProduct } = require("./controllers/productController")


const { verifyToken } = require("./Middleware/userAuth")

// User API 
app.post("/userData", userCreate);
app.post("/userLogin", loginUser);
app.get("/userGet", verifyToken, userGet);

// category API
app.post("/categoryData", verifyToken, categoryCreate);

app.post("/productData", upload.array('image', 5), createProduct)
app.get("/searchProduct", searchProduct)

// app.get("/getData", async (req, res) => {
//     const data = await userModel.find();
//     console.log("---->", data);

//     res.send(data)
// });

// app.put("/updateData/:id", async (req, res) => {
//     const data = await userModel.updateOne({ _id: req.params.id }, {
//         name: req.body.name,
//         email: req.body.email,
//         age: req.body.age
//     });

//     console.log(data);

//     res.send(data)
// })

// app.delete("/deleteData/:id", async (req, res) => {

//     const data = await userModel.deleteOne({ _id: req.params.id })

//     console.log(data);

//     res.send(data)

// })

app.listen(5000);