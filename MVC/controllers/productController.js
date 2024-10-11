
const pro_detailModel = require("../models/productSchema");


const createProduct = async (req, res) => {

    const { product_name, price, qty, size, description, brand_name, cid } = req.body;


    const arrayImage = [];

    for (let i = 0; i < req.files.length; i++) {
        arrayImage[i] = req.files[i].filename;
    }

    const productData = {
        product_name: product_name,
        price: price,
        qty: qty,
        size: size,
        image: arrayImage,
        description: description,
        brand_name: brand_name,
        cid: cid
    }

    const data = await pro_detailModel.create(productData);
    console.log("---->", data);

    res.send(data)

}


const searchProduct = async (req, res) => {
    try {

        const search = req.body.search;

        const searchdata = await pro_detailModel.find({ "product_name": { $regex: ".*" + search + ".*", $options: "i" } })

        console.log(searchdata);

        if (searchdata.length > 0) {
            res.status(200).send({ message: "Product Data", data: searchdata })

        } else {
            res.status(401).send({ message: "Product Not Found" })
        }

    } catch (error) {
        res.send(error)
    }
}

module.exports = {
    createProduct,
    searchProduct
}