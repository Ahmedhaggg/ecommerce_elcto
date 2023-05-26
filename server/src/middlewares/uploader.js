let multer = require('multer');
let cloudinary = require('cloudinary').v2;
const { CLOUD_NAME, API_KEY, API_SECRET } = require("../config");

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

exports.saveInMemory = (field) => multer({
    storage: multer.memoryStorage(),
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5 // we are allowing only 5 MB files
    }
}).single(field);

exports.saveFile = async (buffer, key = null) => {
    try {
        return await cloudinary.uploader
        .upload('data:image/jpeg;base64,' + buffer.toString('base64'), {
            resource_type: 'auto', public_id: key, overwrite: true
        });
    } catch (error) {
        return null;
    }

}
    


exports.removeFile = async key => await cloudinary.uploader.destroy(key)





// const { memoryStorage } = require("multer");
// let multer = require("multer");
// let fs = require("fs/promises");
// const { UPLOADS_DEST } = require("../config");
// const path = require("path");
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//         cb(null, true)
//     } else {
//         cb(null, false)
//     }
// }

// exports.saveInMemory = (field) => multer({
//     storage: memoryStorage(),
//     fileFilter: fileFilter,
//     limits: {
//         fileSize: 1024 * 1024 * 5 // we are allowing only 5 MB files
//     }
// }).single(field);

// exports.saveFile = async (buffer, fileName) => {
//     let filePath = path.join(`${UPLOADS_DEST}`, fileName);
//     try {
//         await fs.writeFile(filePath, buffer);
//         return true
//     } catch (err) {
//         return false;
//     }
// }

// exports.removeFile = async (fileName) => {
//     let filePath = path.join(`${UPLOADS_DEST}`, fileName);
//     try {
//         await fs.unlink(filePath);
//         return true
//     } catch (err) {
//         return false;
//     }
// }