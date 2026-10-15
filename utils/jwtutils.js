import jwt from "jsonwebtoken";
import secretkey from "../jwtconfig.js";

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        secretkey,
        { expiresIn: "1d" }
    );
};

export default generateToken;