const mongoose = require("mongoose");

const pro_detailsSchema = new mongoose.Schema({
    product_name: {
        type: String,
        require: true,
        unique: true,
    },
    price: {
        type: String,
        require: true
    },
    qty: {
        type: String,
        require: true
    },
    size: {
        type: String,
        require: true
    },
    image: {
        type: Array,
        require: true,
        validate: [imageLimit, 'you can only 5 product image store']
    },
    description: {
        type: String,
        require: true
    },
    brand_name: {
        type: String,
        require: true
    },
    cid: {
        type: String,
        require: true
    }
});


function imageLimit(val) {

    return val.length <= 5

}

const pro_detailModel = mongoose.model("Product_Details", pro_detailsSchema);

module.exports = pro_detailModel;
