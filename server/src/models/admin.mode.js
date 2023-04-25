let { Schema, model } = require("mongoose")
let { hash } = require("../utils/hash")

let adminSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

adminSchema.pre("save", async function (next) {
    this.password = await hash(this.password);
    next();
});

const Admin = model("Admin", adminSchema);

module.exports = Admin;