let bcrypt = require("bcryptjs");
let { BCRYPT_SALT } = require("../config/index");
exports.hash = async data => {
    const salt = await bcrypt.genSalt(JSON.parse(BCRYPT_SALT));

    let hash = await bcrypt.hash(data, salt);
    console.log(hash)
    return hash;
}
exports.compare = async (data, hashedData) => {
    
    let isHashed = await bcrypt.compare(data, hashedData);

    return isHashed;
}