// Structure to create user in DB 

const mongoose = require("mongoose");

let userSchema = new mongoose.Schema(
    {
        name: String,
        profileImage: String,
        email: String,
        password: String,
        confirmPassword: String,
        role:String
    },
    {
        collection: "users_list"
    }
);


let userModel = mongoose.model("users_list", userSchema);
module.exports = userModel;