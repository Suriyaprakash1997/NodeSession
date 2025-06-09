const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey";

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const token = req.cookies.authToken;
    console.log('token:',token)
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(403).json({ message: err});
    }
};

function getClaim(req, claimKey) {
    if (req.user && req.user.hasOwnProperty(claimKey)) {
        return req.user[claimKey];
    }
    return null;
}

module.exports = { authenticateToken, getClaim };
