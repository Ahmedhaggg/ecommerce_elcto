const { memoryStorage } = require("multer");
let multer = require("multer");
let fs = require("fs/promises");
const { UPLOADS_DEST } = require("../config");
const path = require("path");
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

exports.saveInMemory = (field) => multer({
    storage: memoryStorage(),
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5 // we are allowing only 5 MB files
    }
}).single(field);

exports.saveFile = async (buffer, fileName) => {
    let filePath = path.join(`${UPLOADS_DEST}`, fileName);
    try {
        await fs.writeFile(filePath, buffer);
        return true
    } catch (err) {
        return false;
    }
}

exports.removeFile = async (fileName) => {
    let filePath = path.join(`${UPLOADS_DEST}`, fileName);
    try {
        await fs.unlink(filePath);
        return true
    } catch (err) {
        return false;
    }
}