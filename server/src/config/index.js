const { dirname } = require("path");
let path = require("path");
let env = require("dotenv");

env.config();

let UPLOADS_DEST = path.join(dirname(dirname(__dirname)), "images");

let {
    SERVER_PORT,
    BCRYPT_SALT,
    JWT_SECRET,
    DB,
    CLIENT,
    STRIPE_KEY
} = process.env;

module.exports = {
    SERVER_PORT,
    BCRYPT_SALT,
    JWT_SECRET,
    UPLOADS_DEST,
    DB,
    CLIENT,
    STRIPE_KEY
};