let { compare } = require("../utils/hash")
let jwt = require("../utils/jwtToken");
let userRepository = require("../repositories/user.repository");
let expressAsyncHandler = require("express-async-handler")

exports.register =  expressAsyncHandler(
    async (req, res, next) => {
        let { email, password, firstName, lastName } = req.body;

        await userRepository.create({
            email,
            password,
            firstName,
            lastName
        });

        res.status(200).json({
            success: true,
            message: "success register"
        });
    }
)

exports.login = expressAsyncHandler(
    async (req, res, next) => {
        let { email, password } = req.body;

        let user = await userRepository.findOne(email);
        if (!user)
            res.status(404).json({
                success: false,
                errorName: "loginError",
                message: "email is not used"
            });

        let checkPassword = await compare(password, user.password);

        if (checkPassword === false)
            res.status(404).json({
                success: false,
                errorName: "loginError",
                message: "correct password"
            });


        let token = await jwt.createJwtToken({
            userId: user._id,
            role: "user"
        }, "30d");

        res.status(200).json({
            success: true,
            token,
            userId: user._id,
            message: "success login"
        });
    }
)
