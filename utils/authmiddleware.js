import jwt from "jsonwebtoken";
import secretkey from "../jwtconfig.js";

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Token is missing"
        });
    }

    const [bearer, token] = authHeader.split(" ");

    if (bearer !== "Bearer" || !token) {
        return res.status(401).json({
            message: "Invalid authorization format"
        });
    }

    jwt.verify(token, secretkey, (error, decoded) => {
        if (error) {
            return res.status(401).json({
                message: "Invalid or expired token"
            });
        }

        req.user = decoded;
        next();
    });
}

export default authenticateToken;