// Structure to create Product in DB 

const mongoose = require("mongoose");

let productSchema = new mongoose.Schema(
    {
        productName: String,
        productImage: String,
        productPrice: String,
        ProductDescription: String,
        quantity: String,
        vendorId:String
    },
    {
        collection: "product_list"
    }
);


let productModel = mongoose.model("product_list", productSchema);
module.exports = productModel;