const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan")
const app = express()

let PORT = 3005;
let dbUrl = "mongodb+srv://muhammadshahab48:Shahab74254@database.cvaqfks.mongodb.net/?retryWrites=true&w=majority";
mongoose
    .connect(dbUrl, { dbName: "E_Store" })
    .then(() => console.log("Data base connected succesfully"))
    .catch((dbErr) => console.log("Something Went wrong while connecting in DB", dbErr));

app.use(express.json())
app.use(morgan("short"));
app.use(cors())

app.use((req, res, next) => {
    console.log(`A request came ${req.body}/`);
    next();
})

// Initial API Route ...!
app.get("/", (req, res) => {
    res.send("Welcome to Our E_Store MERN Project...!");
});

// Calling all external API routes 
app.use(require("./src/routes/auth-routes/auth-routes"))

//API funtion to fetch all users 
app.get("/api/fetch/all-todo-items", (req, res) => {
    todoModel.find({}, (err, data) => {
        if (!err) {
            res.status(200).send({
                status: true,
                data: data
            })
        }
        return res.status(500).send({
            status: false,
            message: "Issue from Server Side"
        })
    })
})


// Note: API function to delete item ...!
app.delete("/api/delete-item/:id", (req, res) => {
    let { id } = req.params;

    todoModel.findByIdAndRemove(id, (err) => {
        if (!err) {
            return res.status(200).send({
                status: true,
                message: "Item Deleted Successfully"
            })
        }

        return res.status(500).send({
            status: false,
            message: "Issue from the server side"
        })
    })
})



app.listen(PORT, () => {
    console.log(`Server is Rnning at PORT: ${PORT}`)
});