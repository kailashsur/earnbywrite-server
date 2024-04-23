// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import 'dotenv/config';

const verifyJWT = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.SECRET_ACCESS_KEY); // Change 'your_secret_key' with your actual secret key
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token.' });
    }
};

export default verifyJWT;