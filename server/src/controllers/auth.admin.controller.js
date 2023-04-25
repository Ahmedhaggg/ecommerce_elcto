let { hash, compare } = require("../utils/hash");
let authAdminRepository = require("../repositories/admin.repository");
let { createJwtToken } = require("../utils/jwtToken");
let expressAsyncHandler = require("express-async-handler");
const HttpStatusCode = require("../errors/httpStatusCode");

exports.login = expressAsyncHandler(
    async (req, res, next) => {
        let { email, password } = req.body;

        let admin = await authAdminRepository.findOne(email);
        if (!admin)
            return res.status(HttpStatusCode.BAD_REQUEST).json({
                success: false,
                message: "email or password is incorrect"
            });

        let checkPassword = await compare(password, admin.password);

        if (checkPassword === false)
            return res.status(HttpStatusCode.BAD_REQUEST).json({
                success: false,
                message: "email or password is incorrect"
            })
        let token = await createJwtToken({
            role: "admin",
            adminId: admin._id
        }, "7d");

        res.status(200).json({
            success: true,
            token
        });
    }
)

exports.register = expressAsyncHandler(
    async (req, res, next) => {
        let { email, password } = req.body;
        
        await authAdminRepository.createAdmin({ email, password });

        res.status(200).json({
            success: true,
            message: "admin created successfully"
        })
    }
)