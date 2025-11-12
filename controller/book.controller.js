import db from '../database/connection.js';
import dotenv from 'dotenv';
dotenv.config();


export const index = async (req, res) => {

    try {
        const todos = await db.query(
            'SELECT id, title, description, img FROM books WHERE deleted = 0 ORDER BY updated_at DESC', 
        );
        
        res.status(200).json(todos);
    } catch (error) {
        console.error('Error: ', error.toString());
        res.status(500).json({ message: 'Something went wrong.' });
    }
}