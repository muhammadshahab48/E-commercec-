//Auth Api routes are defined here 
const express = require("express");
const { emit, deleteOne } = require("../../models/user-structure/user-structure");
const router = express.Router();

//Calling required model structure 
const userModel = require("../../models/user-structure/user-structure");


// API function to create user...! 
router.post("/api/add-user", async (req, res) => {

    try {
        let { name, profileImage , email, password, confirmPassword } = req.body;
        if (!name || !profileImage || !email || !password || !confirmPassword ) {
            return res.status(400).send({
                status: false,
                message: "All fields are required!"
            })
        };

        let hasUserAlreadyExist = await userModel.findOne({ email: email })
        console.log(hasUserAlreadyExist);
        if (hasUserAlreadyExist) {
            return res.status(404).send({
                status: false,
                message: "User already exist"
            });
        }

        // Decoding Password
        password = btoa(password);
        confirmPassword = btoa(confirmPassword);

        let newUser = new userModel({
            name: name,
            profileImage: profileImage,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            role: "admin"
        })
        let saveUser = await newUser.save();
        if (saveUser) {
            return res.status(200).send({
                status: true,
                message: "User Created succesfully",
                data: newUser
            });
        }
    } catch (error) {
        console.log("Something went wrong while creating user ", error);
        return res.status(500).send({
            status: false,
            message: "Something went wrong from server side"
        })
    }
})

// API function to login user...! 
router.post("/api/login-user", async (req, res) => {
    let { email, password } = req.body
    console.log("Email :", email)
    console.log("Password: ", password)

    try {
        let hasUserExist = await userModel.findOne({ email: email })
        
        if (!hasUserExist) {
            return res.status(401).send({
                status: false,  
                message: "User does not exist"
            })
        }
// Decoding Password 
        let userPssword = atob(hasUserExist.password)
        if (userPssword != password) {
            return res.status(402).send({
                status: false,
                message: "Password did not match"
            })
        }
        
        return res.status(200).send({
            status : true,
            message: "You have logged in succesfully",
            data: hasUserExist
        })
    }

    catch (error) {
        console.log("Something went wrong while login user ", error);
        return res.status(500).send({
            status: false,
            message: "Something went wrong from server side"
        })
    }
})

module.exports = router;