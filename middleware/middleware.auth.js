const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

function verifyToken(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        // Expect: Authorization: Bearer <token>
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                error: "Access denied. No token provided."
            });
        }

        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                error: "Invalid authorization header format."
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, SECRET_KEY);

        // attach decoded payload
        req.user = decoded;

        next();

    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                error: "Session expired. Please login again."
            });
        }

        return res.status(401).json({
            success: false,
            error: "Invalid token. Please login again."
        });
    }
}

module.exports = verifyToken;


