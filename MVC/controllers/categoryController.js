const categoryModel = require("../models/categorySchema.js");

const categoryCreate = async (req, res) => {

    const categoryData = {
        category: req.body.category
    }

    const data = await categoryModel.create(categoryData);
    console.log("---->", data);

    res.send(data)

}

module.exports = {
    categoryCreate,
}