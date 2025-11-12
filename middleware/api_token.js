import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.API_KEY;

export const apiKey = (req, res, next) => {
    const _apiKey = req.headers['x-api-key'];

    if (_apiKey === null) {
        return res.status(401).json({ message: 'Unauthorized.' });
    }
    
    if (_apiKey !== API_KEY) {
        return res.status(401).json({ message: 'Unauthorized.' });
    }

    next(); 
};