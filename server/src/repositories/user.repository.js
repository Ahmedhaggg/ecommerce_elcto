let { User } = require("../models");
let { handleInsertErrors } = require("../errors/databaseQueries.error.handler")
exports.create = async data => {
    try {
        let newUser = new User();
        newUser.email = data.email;
        newUser.password = data.password;
        newUser.firstName = data.firstName;
        newUser.lastName = data.lastName;

        return await newUser.save();
    } catch(error) {
        return handleInsertErrors(error)
    }
}

exports.findOne = async (email) => await User.findOne({ email });


exports.findAll = async (query = {}, limit, offset) => await User.find(query)
    .limit(limit)
    .skip(offset)
    .select("-password");

exports.count = async () => await User.count();
