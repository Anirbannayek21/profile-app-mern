const jwt = require("jsonwebtoken")
const User = require("../../model/userSchema")


const auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt_token;
        const verified = jwt.verify(token, process.env.SECRET_KEY)

        const rootUser = await User.findOne({ _id: verified._id, "tokens.token": token })

        if (!rootUser) {
            throw new Error({ message: "User not found" })
        }

        req.rootUser = rootUser;

        next();
    } catch (error) {
        // console.log(error);
        return res.status(400).json({
            error: "User not found"
        })
    }
}

module.exports = auth;