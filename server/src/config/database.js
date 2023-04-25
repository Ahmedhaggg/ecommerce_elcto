let mongoose = require("mongoose");
const { DB } = require(".");

mongoose
    .connect(DB)
    .then(async () => {
        console.log(DB) 
        console.log("mongoose connect")
    })
    .catch((err) => {
        console.log(
            'MongoDB connection error. Please make sure MongoDB is running. ' + err
        )
        process.exit(1)
    })