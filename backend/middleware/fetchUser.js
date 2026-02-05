const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
console.log(jwtSecret);
// const jwtSecret="jay shree ram";


const fetchUser = (req, res, next) => {
    // 🔑 Get the token from request header
    const token = req.header("auth-token");
    const secret = process.env.JWT_SECRET || "default_jwt_secret";

    if (!token) {
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }

    try {
        // ✅ Fix: Correct usage of jwt.verify (arguments were wrong)
        const data = jwt.verify(token, secret); 
        req.user = data.user; // You attached user info when creating token
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
};

module.exports = fetchUser;
