
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


module.exports = {
    createProduct
}