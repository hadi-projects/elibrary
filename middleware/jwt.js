import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const jwtToken = (req, res, next) => {
    const jwtAuth = req.headers['authorization'];
    const token = jwtAuth && jwtAuth.split(' ')[1]; 

    if (token == null) {
        return res.status(401).json({ message: 'Unauthorized.' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Unauthorized.' });
        }

        req.user = user; 

        next(); 
    });
};