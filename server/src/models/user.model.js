let { Schema, model } = require("mongoose")
let { hash } = require("../utils/hash")

let userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
}, { timestamps: false });

userSchema.pre("save", async function (next) {
    this.password = await hash(this.password);
    next();
});


const User = model("User", userSchema);

module.exports = User;