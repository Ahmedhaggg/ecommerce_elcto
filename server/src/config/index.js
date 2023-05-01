const { dirname } = require("path");
let path = require("path");
let env = require("dotenv");

env.config();

let UPLOADS_DEST = path.join(dirname(dirname(__dirname)), "images");

const {
    SERVER_PORT,
    BCRYPT_SALT,
    JWT_SECRET,
    DB,
    CLIENT,
    STRIPE_KEY,
    REDIS_HOST,
    REDIS_PORT,
    REDIS_PASSWORD = null,
    REDIS_SOCKET = "false"
} = process.env;

let IS_REDIS_SOCKET_CONNECTION = REDIS_SOCKET === "true" ? true : false;

module.exports = {
    SERVER_PORT,
    BCRYPT_SALT,
    JWT_SECRET,
    UPLOADS_DEST,
    DB,
    CLIENT,
    STRIPE_KEY,
    REDIS_HOST,
    REDIS_PORT,
    REDIS_SOCKET,
    IS_REDIS_SOCKET_CONNECTION,
    REDIS_PASSWORD
};